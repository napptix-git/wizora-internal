import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 📁 Setup __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ✅ Fetch all layout folders from /backend/layouts
router.get("/", (req, res) => {
  try {
    const layoutsPath = path.join(__dirname, "../layouts");

    const layoutFolders = fs.readdirSync(layoutsPath).filter((item) => {
      const fullPath = path.join(layoutsPath, item);
      return fs.statSync(fullPath).isDirectory();
    });

    const formatted = layoutFolders.map((name, idx) => ({
      id: idx + 1,
      name,
      description: "Default layout description",
      preview: "📱",
      category: "Default",
    }));

    res.json({ layouts: formatted });
  } catch (err) {
    console.error("❌ Error reading layouts:", err);
    res.status(500).json({ error: "Unable to read layout folders" });
  }
});

// ✅ Fetch index.html, style.css, script.js, and asset files from /backend/layouts/<layoutName>
router.get("/assets/:layoutName", (req, res) => {
  const layoutName = req.params.layoutName;
  const layoutPath = path.join(__dirname, "../layouts", layoutName);
  const assetsFolderPath = path.join(layoutPath, "assets");

  try {
    const expectedFiles = ["index.html", "style.css", "script.js"];
    const existingFiles = expectedFiles.filter((file) =>
      fs.existsSync(path.join(layoutPath, file))
    );

    let assetFiles = [];
    if (fs.existsSync(assetsFolderPath)) {
      assetFiles = fs.readdirSync(assetsFolderPath).filter((file) =>
        fs.statSync(path.join(assetsFolderPath, file)).isFile()
      );
    } else {
      console.warn("⚠️ Assets folder does not exist:", assetsFolderPath);
    }

    res.json({ files: existingFiles, assets: assetFiles });
  } catch (err) {
    console.error("❌ Error reading layout files:", err);
    res.status(500).json({ files: [], assets: [] });
  }
});

export default router;
