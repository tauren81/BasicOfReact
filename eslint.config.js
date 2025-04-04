import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import checkFile from 'eslint-plugin-check-file'

export default defineConfig([
    globalIgnores(['.config/', 'node_modules/*', '**/.git', '**/.vscode']),
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        rules: {
            'no-constant-binary-expression': 'error',
            'no-var': 'error',
            indent: 'error',
            'no-multi-spaces': 'error',
            'space-in-parens': 'error',
            'no-multiple-empty-lines': 'error',
            'prefer-const': 'error',
            'no-use-before-define': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['src/**/'],
        plugins: { checkFile },
        rules: {
            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/*.{jsx,tsx}': 'PASCAL_CASE',
                    '**/*.{js,ts}': 'CAMEL_CASE',
                },
            ],
            'check-file/folder-naming-convention': [
                'error',
                {
                    'src/**/': 'CAMEL_CASE',
                    'src/!(components)/**/!(__tests__)/': 'CAMEL_CASE',
                },
            ],
        },
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
])
