const { unlinkSync, existsSync } = require('fs');
const { resolve } = require('path');

module.exports = class DeleteFilesPlugin {

  constructor (files = []) {
    this.files = files;
  }

  apply (compiler) {
    const outputPath = compiler.options.output.path;
    compiler.plugin('done', (stats) => {
      this.files
        .map(file => resolve(outputPath, file))
        .filter(file => existsSync(file))
        .forEach(unlinkSync);
    });
  }
};
