export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            camelcase: [
                'error',
                {
                    properties: 'never',
                    ignoreDestructuring: true,
                    allow: ['data_attribute_stringified'],
                },
            ],
            quotes: ['error', 'backtick'],
            indent: ['error', 4],
            'no-var': 'error',
            'prefer-const': 'off',
            'no-const-assign': 'error',
            'no-console': 'warn',
            'arrow-body-style': ['error', 'as-needed'],
        },
    },
];
