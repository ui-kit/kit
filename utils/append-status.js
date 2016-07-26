export default function(bool, str) {
  if (str.indexOf('has-') === 0) return bool ? str : str.replace('has-', 'has-no-');
  return 'is-' + (bool ? '' : 'not-') + str;
}
