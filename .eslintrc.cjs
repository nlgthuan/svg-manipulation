module.exports = {
  extends: ['preact', 'prettier'],
  plugins: ['import'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
