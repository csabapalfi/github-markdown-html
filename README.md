# github-markdown-html

.md -> .html (with embedded Github styles)

Uses webpack to perform the following:
* turns your markdown into HTML markup (markdown-loader)
* highlights fenced code blocks (highlight-loader)
* drops the rendered markup in a basic HTML template (html-webpack-plugin)
* embeds styles to make your page just like Github (github-markdown-css)
* cleans embedded styles of any unused rules (html-webpack-uncss-plugin)

## installation

```sh
npm install github-markdown-html
```

## usage

```sh
github-markdown-html [script] [file]
```
* `script` is one of `build` or `start`
* `file` is the path to the markdown file to process (optional, defaults to `README.md`)

### available scripts

* `build` drops the built HTML in the `build` directory
```sh
github-markdown-html build # open build/index.html
```
* `start` starts a development server listening on port 8080
```sh
github-markdown-html start # open http://localhost:8080
```

### configuring via `package.json`

Certain options can also be configured via `package.json` by adding a `github-markdown-html` key:

```js
{
  'github-markdown-html': {
    html: {
      //html-webpack-plugin options
    },
    markdown: {
      path: 'path to markdown file'
    }
  }
}
```

See defaults in [/config/webpack.config.js](/config/webpack.config.js)
