const { Renderer } = require('marked');
const renderer = new Renderer();

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  const result = `<h${level}>` +
    (level > 1
      ? `<a class="heading-anchor" href="#${escapedText}">${text}</a>`
      : text
    ) +
    `</h${level}>`;
  return result;
};

module.exports = renderer;
