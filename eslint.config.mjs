import Config from './index.mjs';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...Config,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
