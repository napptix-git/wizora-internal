import express from "express";
import { uploadCreativeBuild } from "../utils/uploadCreativeBuild.js";

const router = express.Router();

/**
 * POST /api/upload-build/:layoutName/:creativeId
 * Description:
 * Uploads the built layout (from layouts/<layoutName>/build)
 * to Supabase Storage under creatives/<creativeId>/
 *
 * Example:
 *   fetch("/api/upload-build/3D-Cube/abc123", { method: "POST" })
 */
router.post("/:layoutName/:creativeId", async (req, res) => {
  const { layoutName, creativeId } = req.params;

  // ✅ Basic validation
  if (!layoutName || !creativeId) {
    return res.status(400).json({
      message: "Missing required layoutName or creativeId in URL.",
    });
  }

  console.log(`📦 Starting upload for layout: ${layoutName}, creativeId: ${creativeId}`);

  try {
    // ✅ Call the reusable upload utility
    await uploadCreativeBuild(layoutName, creativeId); // true = rewrite paths in index.html
    console.log(`✅ Upload complete for creative: ${creativeId}`);
    res.status(200).json({ message: "Creative uploaded successfully.", creativeId });
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    res.status(500).json({
      message: "Upload failed.",
      error: err.message || "Unknown error",
    });
  }
});

export default router;
