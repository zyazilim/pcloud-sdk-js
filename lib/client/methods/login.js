"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = _ref => {
  let {
    client
  } = _ref;
  return optionalParams => {
    return client.api("userinfo", {
      params: {
        ...optionalParams
      }
    }).then(response => {
      return response;
    }).catch(error => {
      console.log("Error", error);
    });
  };
};
exports.default = _default;