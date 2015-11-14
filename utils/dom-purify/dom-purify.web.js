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
    'small',
    'sub',
    'sup',
    'span'
  ],
  RETURN_DOM: true,
  CUSTOM_CLASSES: {
    'a': 'link',
    'iframe_container': 'embedded-iframe-container'
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

DOMPurify.addHook('afterSanitizeElements', function (node, data, config) {
  if (node.nodeName.toLowerCase() === 'iframe') {
    node.width = '100%';
    node.style.width = '100%';
  }
});

function wrapIframes (val, options) {
  if (!val) return '';
  var iframes = val.getElementsByTagName('iframe');
  if (iframes.length) {
    var iframeContainerClass = options.CUSTOM_CLASSES.iframe_container
    for (var i = 0; i < iframes.length; i++) {
      if (!iframes[i].parentNode.classList.contains(iframeContainerClass)) {
        iframes[i].outerHTML = `<div class='${iframeContainerClass}'>${iframes[i].outerHTML}</div>`;  
      }
    }
  }
  return val.innerHTML || '';
}

exports.sanitize = function (dirty, config) {
  var options = objectAssign({}, defaults, config);
  var val = wrapIframes(DOMPurify.sanitize(dirty, options), options);
  return val.replace(/&nbsp;/g, ' ');
}

exports['default'] = DOMPurify;