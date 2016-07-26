import seedClasses from '../utils/seed-classes';

const DEFAULT_OPTIONS = {
  combination: true,
  master: true,
  overwrite: false,
  frozen: false,
};

/**
 * Basic example
 *
 *   var classFn = this.composeClasses('Foobar')
 *   div(class=classFn())
 *     div(class=classFn('&-buz))
 *     div(class=classFn('&-qux))
 *
 * State classes (Second argument)
 *
 *   Define as an object in the original class function, or anywhere class function is used.
 *   If the value provided is truthy/falsey, the class applied will have 'is-'/'is-not' prepended to the key respectively.
 *   Similarly, if the key is prefixed with 'has-', the class will have 'has-'/'has-no-' prepended when truthy/falsey.
 *   Using the '@' in the key will insert the value provided in its place
 *
 * Options (Third argument)
 *
 *   master: use the prop.className as the baseName if possible (default: true)
 *   combination: the component seed can be used together with a master baseName (default: true)
 *   overwrite: the master baseName overrules the component seed (default: false)
 *   frozen: the component seed overrules the master basename (default: false)
 *
 */

export function composeClasses(baseName, statuses, options={}) {
  if (process.env.NODE_ENV === 'development' && !baseName)
    return console.error('You must pass a `baseName`');

  var fns = [];
  var props = this.props;
  var classes = props.classes;
  var opts = Object.assign({}, DEFAULT_OPTIONS, options);
  var base = (opts.master && props.className) ? props.className : props.displayName || baseName;

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

  return applyFns.bind(null, fns);
}

function applyFns(fns, n, sx) {
  var classes = [];
  fns.forEach((fn) => classes.push(fn(n, sx)));
  return classes.join(' ');
}

export default {composeClasses};
