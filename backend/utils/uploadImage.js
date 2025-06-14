import fs from "fs";
import path from "path";
import mime from "mime";
import sharp from "sharp";
import { supabase } from "../lib/supabaseClient.js";
import dotenv from "dotenv";
dotenv.config();

export async function uploadSingleCreativeAsset(imagePath, assetType, creativeId, layoutPath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ File not found: ${imagePath}`);
      return;
    }

    const originalExt = path.extname(imagePath).slice(1).toLowerCase();
    const isVideo = ["mp4", "webm", "ogg"].includes(originalExt);
    const isImage = ["jpg", "jpeg", "webp", "gif", "png"].includes(originalExt);

    // ✅ Force .png for all images
    const fileName = isImage
      ? `${assetType}.png`
      : `${assetType}.${originalExt}`;

    const uploadPath = `${creativeId}/assets/${fileName}`;
    const contentType = isImage
      ? "image/png"
      : mime.getType(originalExt);

    let buffer;

    if (isImage) {
      buffer = await sharp(imagePath)
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();
    } else {
      buffer = fs.readFileSync(imagePath);
    }

    const { error } = await supabase.storage
      .from("creatives")
      .upload(uploadPath, buffer, {
        contentType,
        upsert: true,
        cacheControl: "no-store",
      });

    if (error) {
      console.error(`❌ Upload failed: ${fileName}`, error.message);
    } else {
      console.log(`✅ Uploaded asset as: ${uploadPath}`);
    }

  } catch (err) {
    console.error(`❌ Error during upload:`, err.message);
  }
}