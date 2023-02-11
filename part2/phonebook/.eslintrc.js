module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    //'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module' //to allow import/export
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'react/react-in-jsx-scope': 'off', //to disable 'React' must be in scope when using JSX
    'react/prop-types': 'off' //to disable "missing in props validation"
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
