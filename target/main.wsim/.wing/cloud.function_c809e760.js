"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
      (await (async () => {
        const GreetingClient = 
      require("/home/zoosman/dev/ifc-winglang/target/main.wsim/.wing/inflight.Greeting-2.js")({
        $core_Greeting: 
      require("/home/zoosman/dev/ifc-winglang/target/main.wsim/.wing/inflight.Greeting-1.js")({
      })
    ,
      })
    ;
        const client = new GreetingClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    );
  return await $handler.handle(event);
};