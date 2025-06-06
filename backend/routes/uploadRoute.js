// routes/uploadRoute.js
import express from "express";
import { uploadCreativeBuild } from "../utils/uploadCreativeBuild.js";

const router = express.Router();

router.post("/:layoutName/:creativeId", async (req, res) => {
  const { layoutName, creativeId } = req.params;

  try {
    await uploadCreativeBuild(layoutName, creativeId);
    res.status(200).json({ message: "✅ Creative uploaded successfully." });
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;
