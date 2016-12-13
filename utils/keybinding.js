var bindings = {};
var KEYS = {
  'backspace': 'Backspace',
  'enter': 'Enter',
  'esc': 'Escape'
}
var KEY_NAMES = {
  'backspace': 8,
  'enter': 13,
  'esc': 27
};

exports.KEY_NAMES = KEY_NAMES;
exports.hasKeybinding = hasKeybinding;
exports.attachKeybindings = exports.attachKeybinding = attachKeybindings;
exports.removeKeybindings = exports.removeKeybinding = removeKeybindings;

//- Function to call when adding keybindings
//- @arg {String} bindings - the character key to be bound
//-   || {Object} bindings - the character to listen for as the key, method as the value {[character]: method}
//- @arg {Function} method - the callback handler to call when string is passed to bindings
function attachKeybindings (binding, method) {
  if (!binding) return console.warn('attachKeybinding requires character or object for binding');
  if (typeof binding === 'string' && !method) console.warn('attachKeybindings requries method as second arg');
  if (hasKeybinding(binding, method)) return console.warn(`attachKeybinding: already attached ${binding} to method`, method);

  if (typeof binding === 'string') addMethod(binding, method);
  else Object.keys(binding).forEach((key) => addMethod(key, binding[key]))
}

//- Function to call to remove keybindings
//- @arg {String} bindings - the character key to be removed
//    || {Object} bindings - the character to remove, with method as the value {[character]: method}
//- @arg {Function} method - the callback handler to call when string is passed to bindingsr
function removeKeybindings (bindings, method) {
  if (!bindings) return;
  if (typeof bindings === 'string' && !method) console.warn('removeKeybindings requries method as second arg');
  if (typeof bindings === 'string') return removeMethod(bindings, method);
  Object.keys(bindings).forEach((key) => removeMethod(key, bindings[key]));
}

//- Adds the event to window and the methods to bindings
//- @arg {String} char     - the character key to be bound
//- @arg {Function} method - the callback handler to call
function addMethod (char, method) {
  var keyIsBound = hasKeybinding(char);
  var listener = keyupHandler.bind(null, char, method);

  bindings[char] = bindings[char] || {methods: [], listeners: []};

  if (keyIsBound) window.removeEventListener('keyup', bindings[char].listeners[0]);

  bindings[char].methods.unshift(method);
  bindings[char].listeners.unshift(listener);
  window.addEventListener('keyup', listener);
}

//- Removes the event from window and the methods from bindings
//- @arg {String} char     - the character key to be removed
//- @arg {Function} method - the callback handler to remove
function removeMethod (char, method) {
  if (!hasKeybinding(char, method)) return;
  var fnIndex = bindings[char].methods.indexOf(method);
  window.removeEventListener('keyup', bindings[char].listeners[fnIndex]);
  bindings[char].methods.splice(fnIndex, 1);
  bindings[char].listeners.splice(fnIndex, 1);

  if (!bindings[char].methods.length) {
    delete bindings[char];
  } else if (fnIndex === 0) {
    window.addEventListener('keyup', bindings[char].listeners[0]);
  }
}

//- Returns Boolean if key is bound to a method, or if any bindings exist for that character
//- @arg {String} key - character in question
//- @arg {Function} method - used when you want to know if a key has been bound to a method.
function hasKeybinding (key, method) {
  if (!bindings[key]) return false;
  return method ? !!~bindings[key].methods.indexOf(method) : true;
}

// The method we call to parse the event for the key pressed
//- @arg {String}   matchChar - the character to match
//- @arg {Function} method    - function to call when the key specified is pressed
//- @arg {Object}   evt       - default browser keyup event
function keyupHandler (matchChar, method, evt) {
  // except for esc, we don't want to fire events when somebody is typing in an input
  if ((evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA' && !evt.target.hasAttribute('contenteditable')) || keysMatch(evt, 'esc')) {
    if (keysMatch(evt, matchChar)) method(evt);
  }
}

function keysMatch (evt, matchChar) {
  if (evt.code) {
    return evt.key === KEYS[matchChar] || evt.key === matchChar;
  } else if (evt.keyCode) {
    // KeyCode is being deprecated https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    return evt.keyCode === KEY_NAMES[matchChar] || String.fromCharCode(evt.keyCode) === matchChar.toUpperCase();
  }
}