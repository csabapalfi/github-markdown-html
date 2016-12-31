const spawn = require('cross-spawn');
const { readFileSync } = require('fs');

test('renders index.html from README', () => {
  const result = spawn.sync('github-markdown-html', [], {stdio: 'inherit'});
  expect(readFileSync('index.html', 'utf-8')).toMatchSnapshot();
});
