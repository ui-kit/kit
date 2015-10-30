import seedClasses from '../utils/seed-classes';

/**
 * Examples
 *
 *   var classFn = this.composeClasses('Foobar')
 *   div(class=classFn())
 *     div(class=classFn('-buz))
 *     div(class=classFn('-qux))
 *
 * Options
 *
 *   master: use the prop.className as the baseName if possible
 *   combination: the component seed can be used together with a master baseName
 *   overwrite: the master baseName overrules the component seed
 *
 */

export function composeClasses(baseName, statuses) {
  if (process.env.NODE_ENV === 'development' && !baseName)
    return console.error('You must pass a `baseName`');

  var opts = this.composeClassesOptions || {};
  var props = this.props;
  var classes = props.classes;
  var base = baseName;

  if (props.displayName) base = props.displayName;
  else if (opts.master && props.className) base = props.className;

  var fns = [];
  if (opts.overwrite) {
    fns.push(seedClasses(baseName, statuses, classes));
  } else {
    fns.push(seedClasses(base, statuses, classes));
    if (opts.combination) {
      fns.push(seedClasses(baseName, statuses));
    }
  }

  return (n, sx) => fns.map((fn) => fn(n, sx)).join(' ');
}

export default {composeClasses};
