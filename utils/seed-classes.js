import appendStatus from './append-status'

export default function(base, statuses = {}, classes = {}) {
  if (classes[base]) base = classes[base];

  var rootStatuses = addStatuses(statuses);

  return function(className, classStatuses) {
    var allStatuses = classStatuses
      ? addStatuses(classStatuses, rootStatuses.slice())
      : rootStatuses;

    if (classes[className]) className = classes[className];

    return unique(base.split(' ')).map(function (b) {
      var baseClassName = typeof className === 'string' ? className.replace('&', b) : b + '';
      baseClassName = classes[baseClassName] ? classes[baseClassName] : baseClassName;
      var statusClasses = allStatuses.length ? baseClassName + allStatuses.join(' ' + baseClassName) : '';

      return `${baseClassName} ${statusClasses}`.trim();
    }).join(' ');
  };
}

function unique (arr) {
  return arr.filter((className, i, list) => list.lastIndexOf(className) === i);
}

function addStatuses(sx, arr = []) {

  for (var s in sx) {
    if (!~s.indexOf('@') || (~s.indexOf('@') && sx[s] !== undefined))
      arr.push('-' + appendStatus(sx[s], s.replace('@', sx[s])));
  }
  return arr;
}
