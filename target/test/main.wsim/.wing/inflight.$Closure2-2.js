"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $greeting }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal("Hello, Winglang", (await $greeting.handle("Winglang"))));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-2.js.map