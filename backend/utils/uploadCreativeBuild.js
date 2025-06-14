import fs from "fs";
import path from "path";
import mime from "mime";
import { supabase } from "../lib/supabaseClient.js";
import dotenv from "dotenv";
dotenv.config();

export async function uploadCreativeBuild(layoutName, creativeId) {
  const layoutPath = path.join(process.cwd(), "layouts", layoutName);
  const files = fs.readdirSync(layoutPath);
  const timestamp = Date.now();
  const supabaseAssetUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/creatives/${creativeId}/`;

  // ✅ Upload layout files (excluding /assets)
  for (const file of files) {
    const filePath = path.join(layoutPath, file);
    if (fs.lstatSync(filePath).isDirectory()) continue;
    if (file === "assets") continue;

    const contentType = mime.getType(filePath);
    let buffer;

    if ([".html", ".js", ".css", ".json", ".txt"].includes(path.extname(filePath))) {
      let content = await fs.promises.readFile(filePath, "utf-8");

      // Inject <base> for relative paths + timestamped core assets
      if (file === "index.html") {
        content = content.replace(
          /<head>/i,
          `<head><base href="${supabaseAssetUrl}?t=${timestamp}">`
        );
        content = content
          .replace(/href=["']\.?\/style\.css["']/g, `href="${supabaseAssetUrl}style.css?t=${timestamp}"`)
          .replace(/src=["']\.?\/script\.js["']/g, `src="${supabaseAssetUrl}script.js?t=${timestamp}"`);
      }

      // 💥 Patch asset references in HTML, JS, and CSS
      if (["index.html", "script.js", "style.css"].includes(file)) {
        // Pattern 1: src or href to /assets/*
        content = content.replace(
          /(?:src|href)=["']\/?assets\/(.*?\.(png|jpe?g|svg|webp|mp4|ogg|gif|wav|webm|woff2?|ttf|otf|json))["']/gi,
          (match, fileName) => {
            const attr = match.startsWith("href") ? "href" : "src";
            return `${attr}="${supabaseAssetUrl}assets/${fileName}?t=${timestamp}"`;
          }
        );
        // Pattern 2: JS/CSS asset path as string './assets/foo.png'
        content = content.replace(
          /['"`]\.?\/assets\/(.*?\.(png|jpe?g|svg|webp|mp4|ogg|gif|wav|webm|woff2?|ttf|otf|json))['"`]/gi,
          (_, asset) => `"${supabaseAssetUrl}assets/${asset}?t=${timestamp}"`
        );
      }

      buffer = Buffer.from(content, "utf-8");
    } else {
      buffer = await fs.promises.readFile(filePath);
    }

    // Remove old version
    await supabase.storage.from("creatives").remove([`${creativeId}/${file}`]);

    const { error } = await supabase.storage.from("creatives").upload(
      `${creativeId}/${file}`,
      buffer,
      {
        contentType,
        upsert: true,
        cacheControl: "no-store",
      }
    );

    if (error) console.error(`❌ Failed to upload ${file}:`, error.message);
    else console.log(`✅ Uploaded: ${file}`);
  }

  // ✅ Upload asset files
  const assetsPath = path.join(layoutPath, "assets");
  if (fs.existsSync(assetsPath)) {
    const assetFiles = fs.readdirSync(assetsPath);

    await Promise.all(
      assetFiles.map(async (file) => {
        const filePath = path.join(assetsPath, file);
        const fileBuffer = await fs.promises.readFile(filePath);
        const contentType = mime.getType(filePath);

        await supabase.storage.from("creatives").remove([`${creativeId}/assets/${file}`]);

        const { error } = await supabase.storage.from("creatives").upload(
          `${creativeId}/assets/${file}`,
          fileBuffer,
          {
            contentType,
            upsert: true,
            cacheControl: "no-store",
          }
        );

        if (error) console.error(`❌ Failed to upload asset ${file}:`, error.message);
        else console.log(`✅ Uploaded asset: ${file}`);
      })
    );
  } else {
    console.warn("⚠️ No assets folder found in layout");
  }
}
