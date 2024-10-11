import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "lib/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "iife",
      plugins: [],
    },
    {
      file: "dist/bundle.common.js",
      format: "commonjs",
      plugins: [],
    },
    {
      file: "dist/bundle.es.js",
      format: "es",
      plugins: [],
    },
    {
      file: "demo/dist/bundle.js",
      format: "iife",
      plugins: [],
    },
  ],
});
