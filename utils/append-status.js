export default function(bool, str) {
  if (str.indexOf('has-') === 0) {
    var arr = str.split('has-');
    return arr.join(bool ? 'has-' : 'has-no-');
  }
  return 'is-' + (bool ? '' : 'not-') + str;
}
