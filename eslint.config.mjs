import { defineConfig } from 'eslint/config'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import checkFile from 'eslint-plugin-check-file'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default defineConfig([
    {
        extends: fixupConfigRules(
            compat.extends(
                //'react-app',
                'prettier',
                //'prettier/react',
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:import/recommended',
                'plugin:@typescript-eslint/recommended'
            )
        ),

        plugins: {
            prettier,
            react: fixupPluginRules(react),
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            'check-file': checkFile,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            'react/jsx-filename-extension': [
                1,
                {
                    extensions: ['.js', '.jsx'],
                },
            ],

            'prettier/prettier': 'error',

            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/* .{js,ts,jsx,tsx}': 'KEBAB_CASE',
                },
            ],

            'check-file/folder-naming-convention': [
                'error',
                {
                    'src/**/': 'KEBAB_CASE',
                },
            ],

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
])
