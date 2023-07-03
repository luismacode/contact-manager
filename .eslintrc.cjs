module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'standard',
        'prettier'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off'
    }
};
