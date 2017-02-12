# github-markdown-html

[![build](https://travis-ci.org/csabapalfi/github-markdown-html.png)](https://travis-ci.org/csabapalfi/github-markdown-html)
[![greenkeeper](https://badges.greenkeeper.io/csabapalfi/github-markdown-html.svg)](https://greenkeeper.io/)

Markdown to HTML with webpack

Uses webpack to perform the following:
* turns your markdown into HTML markup (markdown-loader)
* highlights fenced code blocks (highlight-loader)
* drops the rendered markup in a basic HTML template (html-webpack-plugin)
* embeds styles to make your page just like Github by default (github-markdown-css)
* 🔜 or use your custom styles (TODO)
* cleans embedded styles of any unused CSS rules (html-webpack-uncss-plugin)

## installation

```sh
npm install github-markdown-html
```

## simple use-case

Once installed (globally) you can go into any of your repos with a `README.md` then execute `github-markdown-html build`.

This will drop an `index.html` in the same directory that you can simply publish with the [gh-pages](https://www.npmjs.com/package/gh-pages) module:

```sh
gh-pages -d . -s index.html
```

(You can also gitignore `/index.html` to keep your master branch clean.)

## usage

```sh
github-markdown-html [script]
```
* `script` is one of `build` or `dev` (optional, defaults to `dev`)

### available scripts

* `build` drops the built HTML in the current directory
```sh
github-markdown-html build # open index.html
```
* `dev` starts the webpack-dev-server
```sh
github-markdown-html start # open http://localhost:8080
```

### 🔜 custom config (TODO)
