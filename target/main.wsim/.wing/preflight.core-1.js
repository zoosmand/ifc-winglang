"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class Greeting extends $stdlib.std.Resource {
  _id = $stdlib.core.closureId();
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Greeting-1.js")({
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
      ],
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { Greeting };
//# sourceMappingURL=preflight.core-1.js.map