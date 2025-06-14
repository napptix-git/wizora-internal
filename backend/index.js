import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import assetUploadRoute from "./routes/assetuploadRoute.js";
import { supabase } from "./lib/supabaseClient.js";


// ✅ Route imports
import userRoutes from "./routes/userRoutes.js";
import layoutRoutes from "./routes/layoutRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";


dotenv.config();
const app = express();
app.use(express.json());

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
app.use("/api", uploadRoute);
app.use("/api", assetUploadRoute);


// ✅ Proxy preview HTML from Supabase to allow relaxed CSP for iframe
app.get("/api/preview/:id", async (req, res) => {
  const { id } = req.params;
  const supabaseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/creatives/${id}/index.html`;

  try {
    const response = await axios.get(supabaseUrl, { responseType: "text" });

    // ✅ Set no-cache headers to prevent iframe from using stale content
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    // 🔓 Allow iframe to load assets via CSP
    res.setHeader("Content-Type", "text/html");
    res.setHeader(
      "Content-Security-Policy",
      "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data:; font-src * data:;"
    );

    let html = response.data;
const timestamp = Date.now();

// Inject cache-busting query param into all relevant assets
html = html.replace(/(src|href)="([^"]+\.(js|css|png|jpg|jpeg|gif))"/g, (match, attr, url) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${attr}="${url}${separator}t=${timestamp}"`;
});

res.send(html);

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
