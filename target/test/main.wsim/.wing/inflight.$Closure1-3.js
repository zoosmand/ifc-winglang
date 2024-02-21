"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $makeGreetingFunction }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal("Hello, Winglang", (await $makeGreetingFunction.invoke("Winglang"))));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-3.js.map