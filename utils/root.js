import Color from './color.js';
import * as defaultBranding from './branding.js';

/**
 * Examples:
 *
 *   require('ui-kit/utils/root')();
 *
 *   require('ui-kit/utils/root')({
 *     color: {red: 'hsla(0, 50%, 50%, 1)'}
 *   });
 *
 *   require('ui-kit/utils/root')(function(res) {
 *     res.color.primary = res.color.red;
 *   });
 *
 *   require('ui-kit/utils/root')({
 *     color: {red: 'hsla(0, 50%, 50%, 1)'}
 *   }, function(res) {
 *     res.color.primary = res.color.red;
 *   });
 *
 *   require('ui-kit/utils/root')([
 *     middleware1(),
 *     middleware2()
 *   ]);
 *
 *   require('ui-kit/utils/root')({
 *     color: {red: 'hsla(0, 50%, 50%, 1)'}
 *   }, [
 *     middleware1(),
 *     middleware2()
 *   ]);
 *
 * @param {Array|Function|Object?} branding
 * @param {Array|Function?} configure
 */

module.exports = function(branding, configure) {
  if (typeof branding === 'function' || Array.isArray(branding)) {
    configure = branding;
    branding = defaultBranding;
  }
  branding = branding || defaultBranding;
  configure = configure || noop;
  if (typeof configure === 'function') configure = [configure];
  var output = clone(branding);
  output = generateColors(output)
  output = configure.reduce(function(acc, next) {
    return next(acc) || acc;
  }, output);
  output = evaluate(output, output);
  return generateColors(output);
}

/**
 * Recursively evaluate lazy values
 * @param {Object} conf
 * @param {Object} parent
 */

function evaluate(conf, parent) {
  if (!conf || conf.constructor.name !== 'Object') return conf;
  var val;
  for (var key in conf) {
    val = conf[key];
    if (typeof val === 'function') val = reduceVal(parent, val);
    conf[key] = evaluate(val, parent);
  }
  return conf;
}

/**
 * Call function `val` in context of `conf`
 * @param {Object} conf
 * @param {Function} val
 */

function reduceVal(conf, val) {
  val = val.call(conf);
  return typeof val === 'function' ? reduceVal(conf, val) : val;
}

/**
 * Deep clone an object
 * @param {Object} conf
 */

function clone(conf) {
  if (typeof conf !== 'object') return conf;
  var obj = {};
  for (var key in conf) {
    obj[key] = clone(conf[key]);
  }
  return obj;
}

/**
 * Iterate over given colors in `conf` with `Color` class
 * @param {Object} conf
 */

function generateColors(conf) {
  for (var key in conf.color) {
    if (typeof conf.color[key] !== 'string') continue;
    conf.color[key] = new Color(conf.color[key]);
  }
  return conf;
}

function noop(){}
