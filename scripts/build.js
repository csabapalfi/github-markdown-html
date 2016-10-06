process.env.NODE_ENV = 'production';

const fs = require('fs');
const path = require('path');
const rimrafSync = require('rimraf').sync;
const webpack = require('webpack');
const config = require('../config/webpack.config');

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
rimrafSync(process.cwd() + 'build/*');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }
  console.log(stats.toString());
});
