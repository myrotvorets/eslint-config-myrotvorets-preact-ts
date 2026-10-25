import eslintReact from '@eslint-react/eslint-plugin';
import MyrotvoretsConfig from '@myrotvorets/eslint-config-myrotvorets-ts';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y-x';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...MyrotvoretsConfig,
    eslintReact.configs['recommended-typescript'],
    jsxA11yPlugin.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    impliedStrict: true,
                    jsx: true,
                },
            },
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
        },
        settings: {
            'react-x': {
                importSource: 'preact',
                // Preserve the previous React compatibility level instead of detecting React 19.
                version: '16.0.0',
            },
        },
        rules: {
            '@eslint-react/no-missing-component-display-name': 'warn',
            '@eslint-react/no-missing-context-display-name': 'warn',
            '@eslint-react/jsx-no-comment-textnodes': 'error',
            '@eslint-react/no-duplicate-key': 'error',
            '@eslint-react/dom-no-unsafe-target-blank': 'error',
            '@eslint-react/dom-no-dangerously-set-innerhtml': 'warn',
            '@eslint-react/no-set-state-in-component-did-mount': 'error',
            '@eslint-react/no-set-state-in-component-did-update': 'error',

            '@typescript-eslint/no-duplicate-type-constituents': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        rules: {
            '@eslint-react/no-implicit-key': 'error',
        },
    },
    prettierPluginRecommended,
];
