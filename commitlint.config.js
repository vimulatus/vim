module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "type-enum": [
      2,
      "always",
      ["fix", "docs", "chore", "style", "perf", "feat", "build"],
    ],
    "scope-enum": [2, "always", ["turbo", "config", "package", "app", "api"]],
  },
};
