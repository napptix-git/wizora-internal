import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { supabase } from "./lib/supabaseClient.js";

// ✅ Route imports
import userRoutes from "./routes/userRoutes.js";
import layoutRoutes from "./routes/layoutRoutes.js";
import uploadBuildRoute from "./routes/uploadBuild.js";

dotenv.config();
const app = express();

// 📁 Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS configuration
app.use(
  cors({
    origin: "http://localhost:8080", // Update this as needed
    credentials: true,
  })
);

// ✅ Allow iframe embedding + relaxed headers
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  next();
});

// ✅ Body parser for JSON
app.use(express.json());

// ✅ Serve layout folders (used for local access/testing)
app.use("/layouts", express.static(path.join(__dirname, "layouts")));

// ✅ Mount API routes
app.use("/api/users", userRoutes);
app.use("/api/layouts", layoutRoutes);
app.use("/api/upload-build", uploadBuildRoute);

// ✅ Proxy preview HTML from Supabase to allow relaxed CSP for iframe
app.get("/api/preview/:id", async (req, res) => {
  const { id } = req.params;
  const supabaseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/creatives/${id}/index.html`;

  try {
    const response = await axios.get(supabaseUrl, { responseType: "text" });

    // 🔓 Set relaxed CSP so iframe loads CSS, JS, images
    res.setHeader("Content-Type", "text/html");
    res.setHeader(
      "Content-Security-Policy",
      "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data:; font-src * data:;"
    );

    res.send(response.data);
  } catch (err) {
    console.error("❌ Preview fetch error:", err.message);
    res.status(500).send("Failed to load creative preview.");
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
