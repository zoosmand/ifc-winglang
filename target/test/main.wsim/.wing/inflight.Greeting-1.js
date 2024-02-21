"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Greeting {
    constructor({  }) {
    }
    static async makeGreeting(name) {
      return String.raw({ raw: ["Hello, ", ""] }, name);
    }
  }
  return Greeting;
}
//# sourceMappingURL=inflight.Greeting-1.js.map