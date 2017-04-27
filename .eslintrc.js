module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  extends: "airbnb-base",
  plugins: [
    "html"
  ],
  validate: [
      "javascript",
      "html",
      "vue"
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    "max-len": 0,
    "no-console": 0,
    "quotes": ["error", "double"],
    "import/extensions": 0,
    "consistent-return": 0,
    "no-underscore-dangle": 0,
    "no-undef": 0,
    "linebreak-style": 0,
    "no-mixed-operators": 0,
    "no-confusing-arrow": 0,
    "no-use-before-define": 0,
    "new-cap": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
