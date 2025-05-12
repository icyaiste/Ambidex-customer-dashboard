import react from "eslint-plugin-react";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}", "vite.config.{js,ts}"], 
    languageOptions: {
      parser: typescriptParser, 
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
    },
    rules: {
      "react/react-in-jsx-scope": "off", 
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }], 
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
  },
];
