// backend/controllers/userController.js

import { supabase } from "../lib/supabaseClient.js";

export const syncUserToDB = async (req, res) => {
  const { auth_id, email } = req.body;

  // Optional: check if user already exists
  const { data: existing, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", auth_id)
    .single();

  if (existing) {
    return res.status(200).json({ message: "User already exists in DB." });
  }

  // Insert new user
  const { error: insertError } = await supabase.from("users").insert([
    {
      auth_id,
      email,
      username: email, // or customize
    },
  ]);

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  res.status(200).json({ message: "New user successfully added to database." });
};
