import appendStatus from './append-status';

export default function(base, statuses = {}, classNameReplace = {}) {
  if (classNameReplace[base]) base = classNameReplace[base];

  var rootStatuses = addStatuses(statuses);
  var baseRegExp = new RegExp('^' + base + '-?');

  return function(className, classStatuses) {
    var allStatuses = classStatuses
      ? addStatuses(classStatuses, rootStatuses)
      : rootStatuses;

    if (classNameReplace[className]) className = classNameReplace[className];

    var baseClassName = '';
    if (typeof className === 'string') {
      if (className.charAt(0) === '-') {
        baseClassName = base + className;
      } else {
        baseClassName = base + '-' + className.replace(baseRegExp, '');
      }
    } else {
      baseClassName = base + '';
    }

    if (classNameReplace[baseClassName]) baseClassName = classNameReplace[baseClassName];

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
