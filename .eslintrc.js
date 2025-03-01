module.exports = {
  root: true,
  extends: ['expo', 'plugin:react-native/all', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        trailingComma: 'none',
        bracketSameLine: true,
        arrowParens: 'avoid'
      }
    ],
    'react-native/no-unused-styles': 'warn',
    'react-native/sort-styles': 'off',
    'react-native/no-inline-styles': 'off'
  },
  ignorePatterns: ['dist', 'node_modules']
};
