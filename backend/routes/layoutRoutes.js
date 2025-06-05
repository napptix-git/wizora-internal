import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// 📁 Get all layout folders from /layouts
router.get("/", (req, res) => {
  try {
    const layoutsPath = path.join(path.resolve(), "layouts");

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
    console.error("Error reading layouts:", err);
    res.status(500).json({ error: "Unable to read layout folders" });
  }
});

// 📁 Get asset list ONLY from layouts/<layoutName>/build/assets
router.get("/assets/:layoutName", (req, res) => {
  const layoutName = req.params.layoutName;
  const assetsPath = path.join(process.cwd(), "layouts", layoutName, "build", "assets");

  try {
    if (!fs.existsSync(assetsPath)) {
      console.warn("Assets folder does not exist:", assetsPath);
      return res.status(404).json({ files: [] });
    }

    const allFiles = fs.readdirSync(assetsPath).filter((file) =>
      fs.statSync(path.join(assetsPath, file)).isFile()
    );

    res.json({ files: allFiles });
  } catch (err) {
    console.error("Error reading build/assets folder:", err);
    res.status(500).json({ files: [] });
  }
});

export default router;
