const { resolve } = require('path');
const { readFileSync: read } = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
const DeleteFilesPlugin = require('./delete-files');
const renderer = require('./renderer');

const markdownPath = resolve('README.md');
const templatePath = resolve(__dirname, '../src/index.html');
const cssPath = resolve(__dirname, '../src/index.css');
const jsPath = resolve(__dirname, '../src/index.js');
const nodeModulesPath = resolve(__dirname, '../node_modules');
const templateLoader = `${nodeModulesPath}/html-webpack-plugin/lib/loader.js`;

module.exports = ({
  entry: jsPath,
  output: {
    path: process.cwd(),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          'highlight-loader',
          {
            loader: 'markdown-loader',
            options: { renderer }
          }
        ]
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            minimize: true,
            discardUnused: true
          }
        }
      }
    ]
  },
  resolveLoader: {
    modules: [ nodeModulesPath ],
    moduleExtensions: ['*-loader']
  },
  resolve: {
    alias: {
      'index.md': markdownPath,
      'index.css': cssPath
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `!!${templateLoader}!${templatePath}`,
      title: read(markdownPath, 'utf-8').split('\n')[0].replace(/# /, ''),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        preventAttributesEscaping: true
      }
    }),
    new HtmlWebpackUncssPlugin(),
    new DeleteFilesPlugin(['main.js'])
  ]
});
