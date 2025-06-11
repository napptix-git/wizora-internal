
import { supabase } from "../lib/supabaseClient.js";

export const syncUserToDB = async (req, res) => {
  const { auth_id, email } = req.body;

  if (!auth_id || !email) {
    return res.status(400).json({ error: "auth_id and email are required" });
  }

  try {
    // ✅ Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", auth_id)
      .single();

    if (findError && findError.code !== "PGRST116") {
      throw findError;
    }

    // ✅ If user exists, skip insert
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // ✅ Insert new user
    const { error: insertError } = await supabase.from("users").insert([
      {
        auth_id,
        email,
        username: email
      }
    ]);

    if (insertError) {
      throw insertError;
    }

    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.error("❌ Sync user error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
