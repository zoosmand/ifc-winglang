"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
module.exports = {
  get core_() { return require("./preflight.core-2.js") },
  ...require("./preflight.core-1.js"),
};
//# sourceMappingURL=preflight.ifcwinglang-3.js.map