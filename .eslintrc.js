module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx', '__mocks__/*.js'],
      env: {
        jest: true,
      },
    },
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-shadow': 'off',
    'react/state-in-constructor': 'off',
  },
}
