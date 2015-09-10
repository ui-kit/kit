exports = module.exports = backgroundImage;
exports['default'] = backgroundImage;
function backgroundImage(path, options) {
  var style = {};
  if (path && path.src) path = path.src;
  if (path) style.backgroundImage = 'url(' + path + ')';
  if (options && options.backgroundPosition) style.backgroundPosition = getBackgroundPosition(options.backgroundPosition)
  return style;
}

function getBackgroundPosition (position) {
  var positionX = '50%';
  var positionY = '50%';
  if (~position.indexOf('bottom')) positionY = '100%';
  else if (~position.indexOf('top')) positionY = '0%';
  if (~position.indexOf('left')) positionX = '0%';
  else if (~position.indexOf('right')) positionX = '100%';
  return [positionX, positionY].join(' ');
}