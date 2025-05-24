import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // 対象ファイルのパターンを指定
    languageOptions: {
      parser: tsparser, // TypeScript用パーサーを指定
      globals: globals.browser, // グローバル変数の設定
    },
    plugins: { "@typescript-eslint": tseslint, prettier: prettierPlugin }, // PrettierとTypeScript ESLintプラグインを追加
    rules: {
      // PrettierのルールをESLintでエラーとして扱う
      "prettier/prettier": "error",
      // その他のカスタムルールの定義
      semi: ["error", "always"], // セミコロンを常に使用
      quotes: ["error", "single"], // シングルクオートを使用
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }], // 未使用変数の警告
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
      ],
    },
  },
  prettierConfig,
];
