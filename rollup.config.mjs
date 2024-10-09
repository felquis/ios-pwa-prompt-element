import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "lib/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "iife",
      plugins: [
        terser({
          compress: {
            drop_console: false, // Keep console logs
          },
        }),
      ],
    },
    {
      file: "demo/dist/bundle.js",
      format: "iife",
      plugins: [
        terser({
          compress: {
            drop_console: false, // Keep console logs
          },
        }),
      ],
    },
  ],
});
