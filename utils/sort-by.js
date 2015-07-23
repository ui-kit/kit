export default function (prop, $get) {
  var inverse = prop.substr(0, 1) === '!';
  if (inverse) prop = prop.slice(1, prop.length);
  return function(a, b) {
    var aVal = $get(prop, a);
    var bVal = $get(prop, b);
    if (aVal === bVal) return 0;
    var condition = inverse ? (aVal < bVal) : (aVal > bVal);
    return condition ? -1 : 1;
  }
}
