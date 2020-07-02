module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    es6: true,
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  root: true,
  env: {
    browser: true,
    'jest/globals': true
  },
  rules: {
    'no-plusplus': 'off',
    'no-console': ["error", { allow: ["warn", "error"] }] ,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    "import/no-extraneous-dependencies": [
      2,
      {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true
      }
    ],
    "react/jsx-props-no-spreading": 0,
    "no-nested-ternary": "off"
  },
  plugins: ['react', 'prettier', 'jest']
};
