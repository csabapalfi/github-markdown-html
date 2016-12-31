const path = require('path');
const { readFileSync: read } = require('fs');
const deepAssign = require('deep-assign');
const exists = require('path-exists').sync;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const DeleteFilesPlugin = require('./delete-files');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const defaultTemplateLoader =
  `${nodeModulesPath}/html-webpack-plugin/lib/loader.js`;
const defaultTemplatePath = path.resolve(__dirname, '../src/index.html');
const {'github-markdown-html': settings } =
  !exists(packageJsonPath) ? {} : require(packageJsonPath);

const markdownPath = process.argv[2] || 'README.md';

const defaults = {
  parseTitle: true,
  html: {
    template: `!!${defaultTemplateLoader}!${defaultTemplatePath}`,
    inject: false,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      keepClosingSlash: true,
      minifyCSS: true,
      preventAttributesEscaping: true,
    }
  },
  markdown: {
    path: markdownPath,
    loaders: 'html!highlight!markdown'
  }
};

const {
  parseTitle,
  html,
  markdown
} = deepAssign(defaults, settings);

if (parseTitle) {
  html.title = read(path.resolve(process.cwd(), markdownPath))
    .toString().split('\n')[0].replace(/# /, '')
}

module.exports = ({
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: process.cwd(),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: markdown.loaders
      },
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract(
            'css?minimize&discardUnused=true'
        )
      },
    ]
  },
  resolveLoader: {
    root: nodeModulesPath,
    moduleTemplates: ['*-loader']
  },
  resolve: {
    alias: {
      'index.md': path.resolve(process.cwd(), markdown.path)
    }
  },
  plugins: [
    new HtmlWebpackPlugin(html),
    new HtmlWebpackUncssPlugin(),
    new ExtractTextWebpackPlugin('styles.css'),
    new DeleteFilesPlugin(['styles.css', 'bundle.js']),
  ]
});
