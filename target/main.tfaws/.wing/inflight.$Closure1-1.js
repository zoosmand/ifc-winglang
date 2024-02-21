"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(name) {
      console.log(String.raw({ raw: ["Received name: ", ""] }, name));
      const greeting = String.raw({ raw: ["Hello, ", ""] }, name);
      console.log(String.raw({ raw: ["returned: ", ""] }, greeting));
      return greeting;
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map