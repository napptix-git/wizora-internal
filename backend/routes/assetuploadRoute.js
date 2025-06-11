import express from "express";
import multer from "multer";
import path from "path";
import mime from "mime";
import { supabase } from "../lib/supabaseClient.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-asset", upload.single("file"), async (req, res) => {
  const { file } = req;
  const { type, creativeId } = req.body;

  if (!file || !type || !creativeId) {
    return res.status(400).json({ error: "Missing file, type, or creativeId" });
  }

  const baseName = path.basename(type, path.extname(type)); // Clean base (e.g. "cart")
  const newExt = path.extname(file.originalname); // e.g. ".jpeg"
  const newFileName = `${baseName}${newExt}`;
  const newUploadPath = `${creativeId}/assets/${newFileName}`;
  const contentType = mime.getType(file.originalname);

  // 🔍 Delete any existing file matching creatives/{id}/assets/cart.*
  const { data: list, error: listError } = await supabase.storage
    .from("creatives")
    .list(`${creativeId}/assets`, { limit: 100 });

  if (!listError && list) {
    for (const existing of list) {
      if (existing.name.startsWith(baseName) && existing.name !== newFileName) {
        const deletePath = `${creativeId}/assets/${existing.name}`;
        await supabase.storage.from("creatives").remove([deletePath]);
        console.log(`🔁 Replacing ${existing.name} with ${newFileName}`);
      }
    }
  }

  const { error: uploadError } = await supabase.storage
    .from("creatives")
    .upload(newUploadPath, file.buffer, {
      contentType,
      upsert: true, // still ensure replace on same name
    });

  if (uploadError) {
    console.error("❌ Upload error:", uploadError.message);
    return res.status(500).json({ error: uploadError.message });
  }

  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/creatives/${newUploadPath}`;
  console.log(`✅ Uploaded: creatives/${newUploadPath}`);

  res.json({ success: true, path: newUploadPath, url: publicUrl });
});

export default router;
