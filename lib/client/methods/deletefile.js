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
  return fileid => {
    (0, _invariant.default)(typeof fileid === "number", "`fileid` must be a number.");
    (0, _invariant.default)(fileid, "`fileid` is required.");
    return client.api("deletefile", {
      params: {
        fileid: fileid
      }
    }).then(() => true);
  };
};
exports.default = _default;