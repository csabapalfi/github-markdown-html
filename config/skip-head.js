module.exports = function (source) {
  this.cacheable();
  const lines = source.split('\n');
  return lines.splice(1, lines.length).join('\n');
};
