"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../utils");
var _default = _ref => {
  let {
    client
  } = _ref;
  return fileid => {
    return client.api("getfilelink", {
      params: {
        fileid: fileid,
        forcedownload: 1
      }
    }).then(ret => (0, _utils.pCloudUrl)(ret));
  };
};
exports.default = _default;