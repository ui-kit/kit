var objectAssign = require('object-assign');
var sanitizeHtml = require('sanitize-html');

var linkAttrs = {class: 'link', target: '_blank'};
var defaults = {
  allowedTags: [
    'a',
    'b',
    'br',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'i',
    'iframe',
    'img',
    'p',
    'small',
    'sub',
    'sup',
    'span'
  ],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src' ],
    iframe: ['src', 'width', 'height']
  },
  transformTags: {
    'a': sanitizeHtml.simpleTransform('a', linkAttrs),
    'iframe': sanitizeHtml.simpleTransform('iframe', {width: '100%'})
  }
};


exports.sanitize = function (dirty, config) {
  var nConfig = {};
  if (config.ALLOWED_TAGS) nConfig.allowedTags = config.ALLOWED_TAGS;
  if (config.CUSTOM_CLASSES) nConfig.transformTags = getCustomTransformTags(nConfig, config.CUSTOM_CLASSES);
  var val = sanitizeHtml(dirty, objectAssign({}, defaults, nConfig));
  return val.replace(/&nbsp;/g, ' ');
}

function getCustomTransformTags (norm, classes) {
  var obj = {};
  for (var key in classes) {
    var newClass = [classes[key], linkAttrs.class].join(' ');
    obj[key] = sanitizeHtml.simpleTransform(key, {class: newClass, target: linkAttrs.target});
  }

  return objectAssign({}, defaults.transformTags, obj);
}