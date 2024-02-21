"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class Greeting extends $stdlib.std.Resource {
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
      "$inflight_init": [
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "makeGreeting": [
      ],
    });
  }
}
module.exports = { Greeting };
//# sourceMappingURL=preflight.Greeting-1.js.map