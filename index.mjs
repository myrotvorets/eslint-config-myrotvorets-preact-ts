import MyrotvoretsConfig from '@myrotvorets/eslint-config-myrotvorets-ts';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPluginImp from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.Config} */
const reactFlatConfigRecommended = reactPlugin.configs.flat.recommended;
/** @type {import('eslint').ESLint.Plugin} */
const reactHooksPlugin = reactHooksPluginImp;

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...MyrotvoretsConfig,
    reactFlatConfigRecommended,
    jsxA11yPlugin.flatConfigs.recommended,
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
            targets: ['last 2 versions'],
            polyfills: ['fetch', 'Promise'],
            react: {
                pragma: 'h',
                version: '16.0',
            },
        },
        plugins: {
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            ...reactHooksPlugin.configs.recommended.rules,
            'react/no-deprecated': 'error',
            'react/react-in-jsx-scope': 'off', // handled this automatically
            'react/display-name': ['warn', { ignoreTranspilerName: false }],
            'react/jsx-no-bind': [
                'warn',
                {
                    ignoreRefs: true,
                    allowFunctions: true,
                    allowArrowFunctions: true,
                },
            ],
            'react/jsx-no-comment-textnodes': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-target-blank': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
            'react/jsx-uses-vars': 'error',
            'react/jsx-key': ['error', { checkFragmentShorthand: true }],
            'react/self-closing-comp': 'error',
            'react/prefer-es6-class': 'error',
            'react/prefer-stateless-function': 'warn',
            'react/require-render-return': 'error',
            'react/no-danger': 'warn',
            // Legacy APIs not supported in Preact:
            'react/no-did-mount-set-state': 'error',
            'react/no-did-update-set-state': 'error',
            'react/no-find-dom-node': 'error',
            'react/no-is-mounted': 'error',
            'react/no-string-refs': 'error',

            'jsx-quotes': ['error', 'prefer-double'],
            '@typescript/no-use-before-define': 'off',
            '@typescript-eslint/no-duplicate-type-constituents': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/prop-types': 'off',
            'react/sort-comp': [
                'error',
                {
                    order: [
                        'static-methods',
                        'instance-variables',
                        'lifecycle',
                        '/^_?on.+$/',
                        'getters',
                        'setters',
                        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                        'instance-methods',
                        'everything-else',
                        'rendering',
                    ],
                    groups: {
                        lifecycle: [
                            'displayName',
                            'propTypes',
                            'contextTypes',
                            'childContextTypes',
                            'mixins',
                            'statics',
                            'defaultProps',
                            'constructor',
                            'getDefaultProps',
                            'getInitialState',
                            'state',
                            'getChildContext',
                            'getDerivedStateFromProps',
                            'componentWillMount',
                            'UNSAFE_componentWillMount',
                            'componentDidMount',
                            'componentWillReceiveProps',
                            'UNSAFE_componentWillReceiveProps',
                            'shouldComponentUpdate',
                            'componentWillUpdate',
                            'UNSAFE_componentWillUpdate',
                            'getSnapshotBeforeUpdate',
                            'componentDidUpdate',
                            'componentDidCatch',
                            'componentWillUnmount',
                            'componentDidCatch',
                        ],
                        rendering: ['/^_?render.+$/', 'render'],
                    },
                },
            ],
        },
    },
    prettierPluginRecommended,
];
