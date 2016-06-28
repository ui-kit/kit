/*
sort-by defaults to ascending order
@arg prop {String} The property to get from each item
@arg $get {Function} hyper-store get function
@arg options {Object}
  inverse  {Boolean}  Applies a decsending order
  modifier {Function} Applies a function to modify each value before sorting
*/
exports = module.exports = sortBy;
exports['default'] = sortBy;
function sortBy(prop, $get, options) {
  options = options || {};
  var mod = options.modifier;
  var inverse = options.inverse;
  if (prop.substr(0, 1) === '!') {
    prop = prop.slice(1, prop.length);
    inverse = true;
  }
  return function(a, b) {
    var aVal = $get(prop, a);
    var bVal = $get(prop, b);
    aVal = mod && mod(aVal) ? mod(aVal) : aVal;
    bVal = mod && mod(bVal) ? mod(bVal) : bVal;
    if (aVal === bVal) return 0;
    var condition = inverse ? (aVal > bVal) : (aVal < bVal)
    return condition ? -1 : 1;
  }
}
