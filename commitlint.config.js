const TYPES = ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'chore'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    // Type rules
    'type-enum': [2, 'always', TYPES],
    'type-min-length': [2, 'always', 2],
    'type-max-length': [2, 'always', 8],

    // Subject rules
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 80],
    'subject-full-stop': [2, 'never', '.'],

    // Scope rules
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-max-length': [2, 'always', 20],

    // Body/Footer formatting
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],

    'function-rules/scope-empty': [
      2,
      'always',
      (parsed) => {
        if (!parsed?.scope || parsed.scope.trim() === '') {
          return [false, 'scope is required for all commit types (e.g. feat(auth-login): ...)'];
        }
        return [true];
      },
    ],

    'function-rules/subject-case': [
      2,
      'always',
      (parsed) => {
        if (!/^[a-z0-9 ]+/.test(parsed.subject)) {
          return [false, 'subject must start with lowercase and contain only lowercase letters, numbers, and spaces'];
        }
        return [true];
      },
    ],

    'function-rules/scope-case': [
      2,
      'always',
      (parsed) => {
        if (/^\d+-\d+$/.test(parsed.scope)) {
          return [false, 'scope must not use numeric patterns like 20-1'];
        }
        if (!/^(?!.{20,})([a-z]+(-[a-z0-9]+)*)$/.test(parsed.scope)) {
          return [false, 'scope must be kebab-case and less than 20 characters'];
        }
        return [true];
      },
    ],
  },
};
