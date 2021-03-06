module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['data', 'changes'] }],
  },
};
