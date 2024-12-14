// import { nextJsConfig } from "@repo/eslint-config/next-js";

// /** @type {import("eslint").Linter.Config} */
// export default nextJsConfig;

module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["tailwind.config.js", "next.config.js"],
};
