module.exports = function(store, prefix = '', contextFn) {
  return function(namespace, eventName, template, version = '1-0-0') {
    var sp = typeof snowplow === 'undefined' ? noop : snowplow;
    store.getAsync(function($get) {
      return {
        d: template ? template($get) : {},
        u: $get('.account.id'),
        c: contextFn ? contextFn($get) : [],
        n: typeof namespace === 'function' ? namespace($get) : namespace,
        e: typeof eventName === 'function' ? eventName($get) : eventName
      };
    }, function(err, data) {
      if (err) return console.error(err);
      if (data.u) sp('setUserId', data.u);

      if(process.env.DEBUG_EVENTS) {
        console.log(`iglu:${prefix}${data.n}/${data.e}/jsonschema/${version}`);
        console.log(data.d);
        console.log(data.c);
      }

      sp('trackUnstructEvent', {
        schema: `iglu:${prefix}${data.n}/${data.e}/jsonschema/${version}`,
        data: data.d
      }, data.c);
    });
  }
};

function noop(event, data) {
  console.info('snowplow', event, data);
}