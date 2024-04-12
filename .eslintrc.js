module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-alert': 'off',
    'no-array-constructor': 'off',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'error',
    'no-confusing-arrow': 'off',
    'no-continue': 'off',
    'no-constant-condition': 'error',
    'no-div-regex': 'off',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'off',
    'no-eq-null': 'off',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'off',
    'no-extra-parens': ['error', 'all', { 'nestedBinaryExpressions': false }],
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'off',
    'no-implied-eval': 'error',
    'no-inline-comments': 'off',
    'no-invalid-this': 'off',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': 'off',
    'no-mixed-operators': 'error',
    'no-mixed-requires': 'off',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'off',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'off',
    'no-path-concat': 'off',
    'no-plusplus': 'off',
    'no-process-env': 'off',
    'no-process-exit': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-imports': 'off',
    'no-restricted-modules': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'off',
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-whitespace-before-property': 'off',
    'no-spaced-func': 'error',
    'no-sync': 'off',
    'no-tabs': 'off',
    'no-ternary': 'off',
    'no-trailing-spaces': 'error',
    'no-throw-literal': 'off',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
    'no-use-before-define': ['error', 'nofunc'],
    'no-useless-call': 'off',
    'no-useless-computed-key': 'off',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-void': 'error',
    'no-var': 'error',
    'no-warning-comments': 'off',
    'no-with': 'error',
    'array-bracket-spacing': 'error',
    'array-callback-return': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'accessor-pairs': 'off',
    'block-scoped-var': 'off',
    'block-spacing': 'error',
    'brace-style': 'error',
    'callback-return': 'off',
    'camelcase': 'error',
    'class-methods-use-this': 'off',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'complexity': ['error'],
    'computed-property-spacing': 'error',
    'consistent-return': 'error',
    'consistent-this': 'off',
    'curly': 'error',
    'default-case': 'off',
    'dot-location': 'off',
    'dot-notation': 'off',
    'eol-last': 'off',
    'eqeqeq': ['error', 'smart'],
    'func-call-spacing': 'error',
    'func-names': 'off',
    'func-style': 'off',
    'generator-star-spacing': 'off',
    'global-require': 'off',
    'guard-for-in': 'error',
    'handle-callback-err': 'off',
    'id-blacklist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'indent': ['error', 2, { 'SwitchCase': 1, 'CallExpression': { 'arguments': 'off' } }],
    'init-declarations': 'off',
    'jsx-quotes': 'off',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': 'off',
    'line-comment-position': 'off',
    'lines-around-comment': 'off',
    'lines-around-directive': 'off',
    'max-depth': ['error', 5],
    'max-len': 'off',
    'max-lines': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': 'off',
    'multiline-ternary': ['error', 'never'],
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-after-var': 'off',
    'newline-before-return': 'off',
    'newline-per-chained-call': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'off',
    'object-shorthand': 'error',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'operator-assignment': 'error',
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off',
    'prefer-reflect': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': 'off',
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'radix': 'error',
    'require-jsdoc': 'off',
    'rest-spread-spacing': 'error',
    'semi': 'error',
    'semi-spacing': 'error',
    'sort-keys': 'off',
    'sort-imports': 'off',
    'sort-vars': 'off',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'off',
    'strict': 'error',
    'symbol-description': 'off',
    'template-curly-spacing': 'error',
    'unicode-bom': 'off',
    'valid-jsdoc': 'off',
    'vars-on-top': 'error',
    'wrap-iife': 'off',
    'wrap-regex': 'off',
    'no-template-curly-in-string': 'error',
    'yield-star-spacing': 'off',
    'yoda': 'error'
  }
};