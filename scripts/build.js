process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../config/webpack.config');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }
  console.log(stats.toString({ colors: true }));
});
