// vite.config.js

import { defineConfig } from "vite";
import { createVuePlugin as vue } from "vite-plugin-vue2";
import * as path from "path";

export default defineConfig({
    base: "/Sweetie-Website/dist/",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
