const path = require('path');
const { readFileSync: read } = require('fs');
const deepAssign = require('deep-assign');
const exists = require('path-exists').sync;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackUncssPlugin = require('html-webpack-uncss-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const {name ,author, 'github-markdown-html': settings } =
  !exists(packageJsonPath) ? {} : require(packageJsonPath);

const markdownPath = process.argv[2] || 'README.md';

const defaults = {
  parseTitle: true,
  parseAuthor: true,
  html: {
    template: path.resolve(__dirname, '../src/index.html'),
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
  parseAuthor,
  gaTrackingId,
  html,
  markdown
} = deepAssign(defaults, settings);

if (parseTitle) {
  html.title = read(path.resolve(process.cwd(), markdownPath))
    .toString().split('\n')[0].replace(/# /, '')
  markdown.loaders = `${markdown.loaders}!${__dirname}/skip-head`
}

if (parseAuthor) {
  html.author = author;
}

if (gaTrackingId) {
  html.gaTrackingId = gaTrackingId;
  html.path = name;
}

module.exports = ({
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
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
    root: path.resolve(__dirname, '../node_modules'),
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
  ]
});
