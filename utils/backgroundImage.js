exports = module.exports = backgroundImage;
exports['default'] = backgroundImage;
function backgroundImage(path) {
  if (path && path.src) path = path.src;
  if (path) return {backgroundImage: 'url(' + path + ')'};
}
