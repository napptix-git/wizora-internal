// routes/proxy.js
import express from "express";
import { supabase } from "../lib/supabaseClient.js";

const router = express.Router();

router.get("/preview/:creativeId", async (req, res) => {
  const { creativeId } = req.params;
  console.log("Preview request for creativeId:", creativeId);

  const { data, error } = await supabase.storage
    .from("creatives")
    .download(`${creativeId}/index.html`);

  if (error) {
    console.error("Supabase download error:", error.message);
    return res.status(404).send("Creative not found");
  }

  if (!data) {
    console.warn("No data received from Supabase.");
    return res.status(404).send("Creative not found");
  }

  res.setHeader("Content-Type", "text/html");
  res.send(await data.text());
});
export default router;
