// eslint.config.js
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "import/extensions": [
        "error",
        "ignorePackages", // No pide extensión para paquetes npm como "dotenv/config"
        {
          js: "always",
          mjs: "always",
          cjs: "always",
        },
      ],
      "import/no-unresolved": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs"],
        },
      },
    },
  },
]);
