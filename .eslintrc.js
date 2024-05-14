module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  parser: '@babel/eslint-parser',  // Specify Babel as the parser
  parserOptions: {
    requireConfigFile: false,  // This allows you to use Babel without a separate Babel config file
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],  // Specify Babel presets
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
