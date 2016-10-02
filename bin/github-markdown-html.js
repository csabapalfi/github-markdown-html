#!/usr/bin/env node
const spawn = require('cross-spawn');
const script = process.argv[2];
const markdownFile = process.argv[3] || 'README.md';

switch (script) {
case 'build':
case 'start':
  const result = spawn.sync(
    'node',
    [require.resolve('../scripts/' + script)].concat([markdownFile]),
    {stdio: 'inherit'}
  );
  process.exit(result.status);
  break;
default:
  console.log('Unknown script "' + script + '".');
  break;
}
