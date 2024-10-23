//eslint.config.mjs
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "no-unused-vars": "error",  // Mostrar error para variables no usadas
    }
  }
];