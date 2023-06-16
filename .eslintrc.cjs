module.exports = {
  // ルールセットの継承
  extends: [
    // ESLintのデフォルトルールセット
    "eslint:recommended",
    // eslint-plugin-reactの推奨ルールセット
    "plugin:@typescript-eslint/recommended",
    // 型チェックを必要とする推奨ルールセット
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // 厳格なルールセット
    "plugin:@typescript-eslint/strict",
  ],
  // TypeScriptのコードを解析するためのパーサーを指定
  parser: "@typescript-eslint/parser",
  // ESLintのプラグイン
  plugins: ["@typescript-eslint"], // TypeScript用の追加のルール・機能を利用可能にする
  // ルートディレクトリの設定
  root: true, // サブディレクトリに影響を与えないようにする
  // パーサーのオプションの指定
  parserOptions: {
    project: "./tsconfig.json", // 型情報を利用してLintを行う
  },
  // Lintの対象外ファイルの指定
  ignorePatterns: ["index.tsx", ".eslintrc.cjs", "reportWebVitals.ts"],
  // カスタムのルールを指定
  rules: {
    complexity: ["error", 10], // 循環的複雑度を10に設定
  },
};
