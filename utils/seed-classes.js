import appendStatus from './append-status';

export default function(base, statuses = {}, classes = {}) {
  if (classes[base]) base = classes[base];

  var rootStatuses = addStatuses(statuses);
  var baseRegExp = new RegExp('^' + base + '-?');

  return function(className, classStatuses) {
    var allStatuses = classStatuses
      ? addStatuses(classStatuses, rootStatuses)
      : rootStatuses;

    if (classes[className]) className = classes[className];

    var baseClassName = typeof className === 'string'
      ? className.replace('&', base)
      : base + '';

    if (classes[baseClassName]) baseClassName = classes[baseClassName];

    var statusClasses = allStatuses.length
      ? baseClassName + allStatuses.join(' ' + baseClassName)
      : '';

    return `${baseClassName} ${statusClasses}`.trim();
  };
}

function addStatuses(sx, arr = []) {
  for (var s in sx) {
    arr.push('-' + appendStatus(sx[s], s));
  }
  return arr;
}
