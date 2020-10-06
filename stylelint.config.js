module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind', 'mixin', 'each', 'include'],
      },
    ],
    'block-no-empty': null,
    'custom-property-empty-line-before': null,
    'font-family-no-missing-generic-family-keyword': null
  },
}
