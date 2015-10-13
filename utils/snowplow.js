module.exports = function(store, prefix = '', contextFn) {
  return function(namespace, eventName, template, version = '1-0-0') {
    store.getAsync(function($get) {
      return {
        d: template($get),
        u: $get('.account.id'),
        c: contextFn ? contextFn($get) : [],
        n: typeof namespace === 'function' ? namespace($get) : namespace,
        e: typeof eventName === 'function' ? eventName($get) : eventName
      };
    }, function(err, data) {
      if (err) return console.error(err);
      if (data.u) snowplow('setUserId', data.u);

      snowplow('trackUnstructEvent', {
        schema: `iglu:${prefix}${data.n}/${data.e}/jsonschema/${version}`,
        data: data.d
      }, data.c);
    });
  }
};