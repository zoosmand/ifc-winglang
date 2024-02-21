"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure1Client = 
          require("/home/zoosman/dev/ifc-winglang/target/test/main.wsim/.wing/inflight.$Closure1-3.js")({
            $expect_Util: require("/home/zoosman/.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/expect/assert.js").Util,
            $makeGreetingFunction: (function() {
  let handle = process.env.FUNCTION_HANDLE_ed8a4e04;
  if (!handle) {
    throw new Error("Missing environment variable: FUNCTION_HANDLE_ed8a4e04");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event);
};