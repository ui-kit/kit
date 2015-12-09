import appendStatus from './append-status';

export default function(base, statuses = {}, classes = {}) {
  if (classes[base]) base = classes[base];

  var rootStatuses = addStatuses(statuses);
  
  return function(className, classStatuses) {
    var allStatuses = classStatuses
      ? addStatuses(classStatuses, rootStatuses)
      : rootStatuses;

    if (classes[className]) className = classes[className];

    return base.split(' ').map(function (b) {
      var baseClassName = typeof className === 'string' ? className.replace('&', b) : b + '';
      baseClassName = classes[baseClassName] ? classes[baseClassName] : baseClassName;
      var statusClasses = allStatuses.length ? baseClassName + allStatuses.join(' ' + baseClassName) : '';
      
      return `${baseClassName} ${statusClasses}`.trim();
    }).join(' ');
  };
}

function addStatuses(sx, arr = []) {
  for (var s in sx) {
    arr.push('-' + appendStatus(sx[s], s));
  }
  return arr;
}
