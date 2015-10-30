import seedClasses from '../utils/seed-classes';

const DEFAULT_OPTIONS = {
  combination: true,
  master: true,
  overwrite: false,
  frozen: false,
};

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
 *   master: use the prop.className as the baseName if possible (default: true)
 *   combination: the component seed can be used together with a master baseName (default: true)
 *   overwrite: the master baseName overrules the component seed (default: false)
 *   frozen: the component seed overrules the master basename (default: false)
 *
 */

export function composeClasses(baseName, statuses) {
  if (process.env.NODE_ENV === 'development' && !baseName)
    return console.error('You must pass a `baseName`');

  var props = this.props;
  var classes = props.classes;
  var base = baseName;
  var opts = this.composeClassesOptions
    ? Object.assign(DEFAULT_OPTIONS, this.composeClassesOptions)
    : DEFAULT_OPTIONS;

  if (props.displayName) base = props.displayName;
  else if (opts.master && props.className) base = props.className;

  var fns = [];
  if (opts.frozen) {
    fns.push(seedClasses(baseName, statuses, classes));
  } else if (opts.overwrite) {
    fns.push(seedClasses(base, statuses, classes));
  } else {
    fns.push(seedClasses(base, statuses, classes));
    if (opts.combination && base !== baseName) {
      fns.push(seedClasses(baseName, statuses));
    }
  }

  return (n, sx) => fns.map((fn) => fn(n, sx)).join(' ');
}

export default {composeClasses};
