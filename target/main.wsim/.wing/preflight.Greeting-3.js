"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const core = require("./preflight.core-2.js");
class Greeting extends $stdlib.std.Resource {
  _id = $stdlib.core.closureId();
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Greeting-2.js")({
        $core_Greeting: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(core.Greeting, "", "Greeting"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const GreetingClient = ${Greeting._toInflightType()};
        const client = new GreetingClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "handle": [
        [$stdlib.core.toLiftableModuleType(core.Greeting, "", "Greeting"), ["makeGreeting"]],
      ],
      "$inflight_init": [
        [$stdlib.core.toLiftableModuleType(core.Greeting, "", "Greeting"), []],
      ],
    });
  }
}
module.exports = { Greeting };
//# sourceMappingURL=preflight.Greeting-3.js.map