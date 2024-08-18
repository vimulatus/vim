/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@vim/eslint-config/astro.js"],
  parser: "astro-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".astro"]
  },
}
