// routes/uploadRoute.js
import express from "express";
import { uploadCreativeBuild } from "../utils/uploadCreativeBuild.js";
import { supabase } from "../lib/supabaseClient.js"; // make sure this path is correct

const router = express.Router();

// Changed route: now expects creativeRowId instead of creativeId
router.post("/:layoutName/:creativeRowId", async (req, res) => {
  const { layoutName, creativeRowId } = req.params;

  try {
    // ✅ Step 1: Fetch creative_id from Supabase using the row ID
    const { data, error } = await supabase
      .from("creatives")
      .select("creative_id")
      .eq("id", creativeRowId)
      .single();

    if (error || !data) {
      console.error("❌ Failed to fetch creative_id:", error?.message);
      return res.status(400).json({ message: "Invalid creative ID" });
    }

    const creativeId = data.creative_id;

    // ✅ Step 2: Use the correct creativeId in upload
    await uploadCreativeBuild(layoutName, creativeId);

    res.status(200).json({ message: "✅ Creative uploaded successfully." });
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;
