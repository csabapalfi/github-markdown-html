process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const markdownFile = process.argv[2]
const config = require('../config/webpack.config')(markdownFile);
const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler);

devServer.listen(8080, (err) => {
  if (err) {
    return console.error(err.message || error);
  }
});
