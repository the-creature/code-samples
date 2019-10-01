module.exports = {
  processors: ['stylelint-processor-styled-components'],
  syntax: 'scss',
  extends: ['stylelint-config-recommended', 'stylelint-config-styled-components'],
  rules: {
    'no-descending-specificity': null,
  },
};
