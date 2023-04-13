module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["index.tsx", ".eslintrc.cjs", "reportWebVitals.ts"],
  rules: {
    // ここにルールを指定する
  },
};
