var bindings = {};
var KEY_NAMES = {
  'enter': 13,
  'esc': 27
};

exports.KEY_NAMES = KEY_NAMES;

exports.attachKeybinding = function (char, callback) {
  if (!char || !callback) return console.warn('attachKeybinding requires character and callback.');
  if (bindings[char]) return console.warn('keybinding for "' + char + '" already exists.');
  var handler = bindings[char] = keyupHandler.bind(null, char, callback);
  window.addEventListener('keyup', handler);
}

// keys can be array of strings or single string
exports.removeKeybindings = function (keys) {
  var item, handler;
  if (Array.isArray(keys)) {
    for (var i in keys) {
      item = keys[i];
      handler = bindings[item];
      if (handler) {
        window.removeEventListener('keyup', handler);
        delete bindings[item];
      }
    }
  } else {
    window.removeEventListener('keyup', bindings[keys]);
    delete bindings[keys];
  }
}

exports.hasKeybinding = function (key) {
  return !!bindings[key];
}

function keyupHandler (matchChar, callback, evt) {
  // we don't want to fire events when somebody is typing in an input, esc is okay to fire
  if ((evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA' && !evt.target.hasAttribute('data-medium-editor-element')) || evt.keyCode === KEY_NAMES.esc) {
    if (evt.keyCode === KEY_NAMES[matchChar] || String.fromCharCode(evt.keyCode) === matchChar.toUpperCase()) callback.apply(null);
  }
}