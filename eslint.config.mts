import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  ...tseslint.configs.recommended,
  {
    // prettier를 ESLint 안으로 통합
    plugins: { prettier: prettier as Record<string, Plugin> },
    extends: ['prettier'],
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙 위반시 ESLint 에러
    },
  },
]);
