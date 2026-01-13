#!/usr/bin/env node

const { execSync } = require('child_process');

const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const validTypes = ['feat', 'fix', 'chore', 'refactor', 'test', 'docs', 'build', 'ci', 'perf', 'revert', 'style'];

// Example: feat/auth-login
const pattern = new RegExp(
  `^(${validTypes.join('|')})\\/` + // type/
    `(?!temp|wip)(?!\\d+-\\d+)` + // disallowed patterns
    `[a-z0-9]+(-[a-z0-9]+)*$` // kebab-case name
);

if (!pattern.test(branch)) {
  console.error(`❌ Invalid branch name: "${branch}"`);
  console.error(`✅ Expected format: <type>/<kebab-case>, e.g. feat/auth-login`);
  process.exit(1);
}

console.info(`✅ Branch name "${branch}" is valid.`);
