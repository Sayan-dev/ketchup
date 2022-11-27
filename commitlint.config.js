module.exports = {
  extends: ['gitmoji'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'release',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'WIP',
        'build',
        'ci',
        'hotfix',
      ],
    ],
  },
};
