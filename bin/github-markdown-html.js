#!/usr/bin/env node
const spawn = require('cross-spawn');
const [,, script = 'build', markdownPath ] = process.argv;

switch (script) {
case 'build':
case 'dev':
  const result = spawn.sync(
    'node',
    [require.resolve('../scripts/' + script)]
      .concat(markdownPath ? [markdownPath] : []),
    {stdio: 'inherit'}
  );
  process.exit(result.status);
  break;
default:
  console.log('Unknown script "' + script + '".');
  break;
}
