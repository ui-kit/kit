module.exports = function(store, prefix = '', contextFn) {
  return function(namespace, eventName, template, version = '1-0-0') {
    function render() {
      context.start();
      var $get = context.get;

      try {
        var data = template($get);
        var userID = $get(['', 'account', 'id']);
        var contexts = contextFn ? contextFn($get) : [];
      } catch (err) {
        // TODO
        return;
      }

      if (!context.stop()) return;
      context.destroy();

      if (userID) snowplow('setUserId', userID);

      snowplow('trackUnstructEvent', {
        schema: `iglu:${prefix}${namespace}/${eventName}/jsonschema/${version}`,
        data: data
      }, contexts);
    }
  };
};