export default function(bool, str) {
  return 'is-' + (bool ? 'not-' : '') + str;
}
