const fs = require("fs");
const path = require("path");

module.exports = {
  base: "./", // Use relative paths for assets

  build: {
    outDir: "build",        // Output directory
    assetsDir: "assets",    // Asset subfolder
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // HTML entry
      },
      output: {
        entryFileNames: "script.js",                // Output JS in root
        chunkFileNames: "script.js",                // Handle JS chunks same way
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".css")) {
            return "style.css";                     // Output CSS in root
          }
          return "assets/[name][extname]";          // Other assets in /assets
        },
      },
    },
  },

  plugins: [
    {
      name: "force-copy-blank",
      closeBundle: () => {
        const source = path.resolve(__dirname, "assets/blank.png");
        const target = path.resolve(__dirname, "build/assets/blank.png");

        if (fs.existsSync(source)) {
          fs.copyFileSync(source, target);
          console.log("✅ Manually copied blank.png into build/assets/");
        } else {
          console.warn("⚠️ blank.png not found in assets/");
        }
      },
    },
  ],
};
