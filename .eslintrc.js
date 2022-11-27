module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@react-native-community', 'plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/no-unescaped-entities': 'off',
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 0,
    'react-native/split-platform-components': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react/forbid-prop-types': 'off',
  },
};
