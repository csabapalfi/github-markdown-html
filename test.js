const { readFileSync } = require('fs');

test('renders index.html from README', () => {
  expect(readFileSync('index.html', 'utf-8')).toMatchSnapshot();
});
