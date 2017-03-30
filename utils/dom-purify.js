// deprecated - use dom-purify/index.js
var objectAssign = require('object-assign');
var DOMPurify = require('dompurify');

var defaults = {
  ALLOWED_TAGS: [
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
    'span',
    'sub',
    'sup'
  ],
  CUSTOM_CLASSES: {
    'a': 'link'
  }
};

DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  // set all elements owning target to target=_blank
  if ('target' in node) {
    node.setAttribute('target','_blank');
  }
  // set non-HTML/MathML links to xlink:show=new
  if (!node.hasAttribute('target') && (node.hasAttribute('xlink:href') || node.hasAttribute('href'))){
    node.setAttribute('xlink:show', 'new');
  }
});

DOMPurify.addHook('afterSanitizeAttributes', function (node, data, config) {
  if (!config.CUSTOM_CLASSES) return;
  var className = config.CUSTOM_CLASSES[node.nodeName.toLowerCase()]
  if (!!className) node.classList.add(className);
});

DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  if (node.nodeName.toLowerCase() === 'iframe') {
    node.width = '100%';
    node.style.width = '100%';
  }
});

exports.sanitize = function (dirty, config) {
  var val = DOMPurify.sanitize(dirty, objectAssign({}, defaults, config));
  return val.replace(/&nbsp;/g, ' ');
}

exports['default'] = DOMPurify;