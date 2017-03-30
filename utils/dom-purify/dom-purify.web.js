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
  REMOVE_EMPTY_PARAGRAPHS: true,
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
      var iframe = iframes[i];
      iframe.setAttribute('allowfullscreen', true);
      var heightClass = iframe.height || iframe.style.height ? 'has-height' : ''
      if (!iframe.parentNode.classList.contains(iframeContainerClass)) {
        iframe.outerHTML = `<div class='${iframeContainerClass} ${heightClass}'>${iframe.outerHTML}</div>`;
      }
    }
  }
  return val.innerHTML || '';
}

exports.sanitize = function (dirty, config) {
  var options = objectAssign({}, defaults, config);
  var val = wrapIframes(DOMPurify.sanitize(dirty, options), options);
  val = val.replace(/&nbsp;/g, ' ');
  if (options.REMOVE_EMPTY_PARAGRAPHS) val = val.replace(/<p><\/p>/g, '');
  return val;
}

exports['default'] = DOMPurify;