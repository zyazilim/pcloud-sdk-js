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
  return function (file) {
    let folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _invariant.default)(file, "`file` is required.");
    (0, _invariant.default)(typeof file === "string", "`file` must be supplied");
    (0, _invariant.default)(require("fs").existsSync(file), "File: ".concat(file, " is not accessible."));
    const {
      onBegin,
      onProgress,
      onFinish
    } = options;
    onBegin && onBegin();
    return client.api("uploadfile", {
      method: "post",
      params: {
        folderid: folderid,
        nopartial: 1
      },
      files: [{
        file: file
      }],
      onProgress: progress => {
        if (progress.direction === "upload") {
          onProgress && onProgress(progress);
        }
      }
    }).then(response => {
      const ret = apiResponseToReturn(response);
      onFinish && onFinish(ret);
      return ret;
    });
  };
};
exports.default = _default;
function apiResponseToReturn(_ref2) {
  let {
    metadata,
    checksums
  } = _ref2;
  return {
    metadata: metadata[0],
    checksums: checksums[0]
  };
}