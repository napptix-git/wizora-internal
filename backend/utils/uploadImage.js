import fs from "fs";
import path from "path";
import mime from "mime";
import { supabase } from "../lib/supabaseClient.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Upload a single image file to Supabase under creatives/{creativeId}/assets/
 * @param {string} imagePath - Path to the image file
 * @param {string} assetType - Logical name (e.g. "hero", "bg", "cta")
 * @param {string} creativeId - ID of the creative
 */
export async function uploadSingleCreativeAsset(imagePath, assetType, creativeId) {
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ File not found: ${imagePath}`);
    return;
  }

  const ext = path.extname(imagePath).slice(1); // jpg, png, etc.
  const fileName = `${assetType}.${ext}`;
  const contentType = mime.getType(imagePath);
  const fileBuffer = fs.readFileSync(imagePath);
  const uploadPath = `${creativeId}/assets/${fileName}`;

  // 🧹 Force-delete old file to bust CDN cache
  await supabase.storage.from("creatives").remove([uploadPath]);

  const { error } = await supabase.storage
    .from("creatives")
    .upload(uploadPath, fileBuffer, {
      contentType,
      upsert: true,
      cacheControl: "no-store" // ✅ tells CDN not to cache it
    });

  if (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
  } else {
    console.log(`✅ Uploaded: creatives/${uploadPath}`);
  }
}
