import { defineConfig } from "rollup";

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig([
  {
    input: "lib/index.js",
    output: [
      {
        file: "dist/bundle.js",
        format: "iife",
        plugins: [],
      },
      {
        file: "dist/bundle.common.js",
        format: "cjs",
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
  },
  // meant for e2e testing
  {
    input: "tests/commonjs-test.js", // Your test file
    output: {
      file: "tests/dist/commonjs-test.js", // Output file for the test
      format: "iife", // Suitable for <script> tags
      name: "TestBundle",
    },
    plugins: [
      resolve(), // Helps Rollup find `node_modules`
      commonjs(), // Converts CommonJS modules to ES6
    ],
  },
]);
