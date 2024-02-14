"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _invariant = _interopRequireDefault(require("invariant"));
var _default = _ref => {
  let {
    client
  } = _ref;
  return function () {
    let folderid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let optionalParams = arguments.length > 1 ? arguments[1] : undefined;
    (0, _invariant.default)(typeof folderid === "number", "`folderid` must be a number.");
    return client.api("listfolder", {
      params: {
        folderid: folderid,
        ...optionalParams
      }
    }).then(response => {
      return response.metadata;
    });
  };
};
exports.default = _default;