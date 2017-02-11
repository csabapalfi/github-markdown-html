#!/usr/bin/env node
const { spawnSync: spawn } = require('child_process');
const [ ,, script = 'build', markdownPath ] = process.argv;

switch (script) {
  case 'build':
  case 'dev':
    const result = spawn(
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
