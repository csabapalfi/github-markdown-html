# github-markdown-html

.md -> .html (with embedded Github styles, using webpack)

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

```sh
github-markdown-html build # open build/index.html
```
* `build` drops the built HTML in the `build` directory

```sh
github-markdown-html start # open http://localhost:8080
```

* `start` starts a development server listening on port 8080

## what does it do?

Uses webpack to perform the following:
* turns your markdown into HTML markup (markdown-loader)
* highlights fenced code blocks (highlight-loader)
* drops the rendered markup in a basic HTML template (html-webpack-plugin)
* embeds styles to make your page just like Github (github-markdown-css)
* cleans embedded styles of any unused rules (html-webpack-uncss-plugin)
