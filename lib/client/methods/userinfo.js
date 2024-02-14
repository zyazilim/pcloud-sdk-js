"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = _ref => {
  let {
    client
  } = _ref;
  return () => {
    return client.api("userinfo");
  };
};
exports.default = _default;