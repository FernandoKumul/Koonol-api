import globals from "globals";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import path from "path";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: path.resolve(__dirname),
      },
      globals: {
        ...globals.browser,
        // Añade otros globals si es necesario
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-unused-vars": "error", // Mostrar error para variables no usadas
      // Añade o sobrescribe otras reglas si es necesario
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        // Añade otros globals si es necesario
      },
    },
    rules: {
      // Reglas para archivos JavaScript
    },
  },
];
