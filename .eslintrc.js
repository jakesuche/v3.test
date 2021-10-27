module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/essential',
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/newline-after-import': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/v-slot-style': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-await-in-loop': 'off',
    'no-explicit-any': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'linebreak-style': 0,
    'no-unused-vars':'off',
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
