module.exports = {
    env: {
        browser: true, // Enables browser globals like window and document
        es2021: true,
        node: true, // Enables Node.js globals like process and Buffer
    },
    extends: [
        'airbnb', // Extends Airbnb base rules (includes rules for React)
    ],
    parserOptions: {
        ecmaVersion: 2021, // Adjusted to match es2021 environment
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Example rules
        'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React to be in scope
        'no-console': 'warn', // Change console statements to warnings
    },
    overrides: [
        {
            files: ['**/*.backend.js', '**/*.js'], // Adjust file patterns to match backend files
            rules: {
                // Backend-specific rules
                'no-unused-vars': ['error', { varsIgnorePattern: 'should|expect' }]
            }
        },
        {
            files: ['**/*.jsx', '**/*.js'],
            rules: {
                // Frontend-specific rules
                'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
            }
        }
    ]
};
