// vite.config.js

import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: ["es2022", "firefox115", "chrome115", "safari14"],
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@firebase")) {
              return "vendor-firebase";
            }
            if (id.includes("@fortawesome")) {
              return "vendor-fontawesome";
            }
            if (id.includes("embla-carousel")) {
              return "vendor-embla-carousel";
            }
            if (id.includes("vue-datepicker")) {
              return "vendor-vue-datepicker";
            }
            if (id.includes("date-fns")) {
              return "vendor-date-fns";
            }
            if (id.includes("axios")) {
              return "vendor-axios";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
