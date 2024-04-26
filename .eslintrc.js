module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {

    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['**/*.backend.js', '**/*.js'],
      rules: {
        'no-unused-vars': ['error', { varsIgnorePattern: 'should|expect' }],
      },
    },
    {
      files: ['**/*.jsx', '**/*.js'],
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      },
    },
  ],
};
