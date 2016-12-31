const spawn = require('child_process').spawnSync;
const { readFileSync } = require('fs');

test('renders index.html from README', () => {
  const result = spawn('github-markdown-html', [], {stdio: 'inherit'});
  expect(readFileSync('index.html', 'utf-8')).toMatchSnapshot();
});
