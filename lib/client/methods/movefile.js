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
  return (fileid, tofolderid) => {
    (0, _invariant.default)(typeof fileid === "number", "`fileid` must be number.");
    (0, _invariant.default)(fileid !== 0, "`fileid` cannot be 0.");
    (0, _invariant.default)(tofolderid, "`tofolderid` is required.");
    return client.api("renamefile", {
      params: {
        fileid: fileid,
        tofolderid: tofolderid
      }
    }).then(response => response.metadata);
  };
};
exports.default = _default;