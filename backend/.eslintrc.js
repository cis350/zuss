module.exports = {
    env: {
        commonjs: true,  
        es2021: true,
        node: true       
    },
   
    parser: "@typescript-eslint/parser",         
    parserOptions: {
        ecmaVersion: 12,                         
        sourceType: "module",
        project: './tsconfig.json'                    
    },
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "no-unused-vars": "warn",                    
        "no-console": "off"                         
    }
};
