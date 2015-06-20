var bindings = {};
var KEY_NAMES = {
  'esc': 27
};

exports.attachKeybinding = function (char, callback) {
  var handler = bindings[char] = keyupHandler.bind(null, char, callback);
  window.addEventListener('keyup', handler);
}

exports.removeAllKeybindings = function (matchChar, callback, evt) {
  for (var key in bindings) {
    window.removeEventListener('keyup', bindings[key]);
  }
}

function keyupHandler (matchChar, callback, evt) {
  var keyboardStrings = {'esc': 27};
  if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
    if (String.fromCharCode(evt.keyCode) === matchChar.toUpperCase() || evt.keyCode === KEY_NAMES[matchChar]) callback.apply(null);
  }
}