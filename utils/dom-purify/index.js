module.exports = process.BUILD_TARGET === 'web' ?
  require('./dom-purify.web.js') :
  require('./dom-purify.node.js');