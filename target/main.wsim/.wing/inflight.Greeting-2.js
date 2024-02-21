"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $core_Greeting }) {
  class Greeting {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(name) {
      console.log(String.raw({ raw: ["Received name: ", ""] }, name));
      const greeting = (await $core_Greeting.makeGreeting(name));
      console.log(String.raw({ raw: ["returned: ", ""] }, greeting));
      return greeting;
    }
  }
  return Greeting;
}
//# sourceMappingURL=inflight.Greeting-2.js.map