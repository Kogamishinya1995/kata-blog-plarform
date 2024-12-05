module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }], // ! Add no-param-reassign rule from overrides.
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['src/**/*Slice.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
};
