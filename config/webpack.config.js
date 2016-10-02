const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = (markdownFile) => ({
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: "html!highlight!markdown"
      },
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract(
            'css?minimize&discardUnused=true'
        )
      },
    ]
  },
  resolve: {
    alias: {
      'index.md': path.resolve(process.cwd(), markdownFile)
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
      }
    }),
    new HtmlWebpackUncssPlugin(),
    new ExtractTextWebpackPlugin('styles.css'),
  ]
});
