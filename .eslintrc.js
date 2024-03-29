module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:import/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single']
  },
  'overrides': [
    {
      'files': [
        '**/*.test.js',
      ],
      'env': {
        'jest': true
      }
    }
  ]
};
