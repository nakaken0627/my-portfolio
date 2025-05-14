/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^expo", "<TYPES>", "<THIRD_PARTY_MODULES>", "", "^@acme", "^~/", "^[../]", "^[./]"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  arrowParens: "always",
  printWidth: 120,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  proseWrap: "always",
};

export default config;
