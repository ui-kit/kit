var USERAGENT_NAMES = {
  'ie': /Edge\/|Trident\/|MSIE /,
  'touch': /Android|webOS|iPhone|iPad|iPod|BlackBerry/i
}

exports.USERAGENT_NAMES = USERAGENT_NAMES;

exports.isUserAgent = function (name) {
  return name.test(navigator.userAgent);
}