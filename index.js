module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['jsx-a11y'],
    extends: ['@myrotvorets/myrotvorets-ts', 'preact', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended'],
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'no-invalid-this': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        '@typescript/no-use-before-define': 'off',
        '@typescript-eslint/no-duplicate-type-constituents': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
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
};
