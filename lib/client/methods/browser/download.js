"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiRequest = _interopRequireDefault(require("../../../api/ApiRequest"));
var _default = () => function (filename) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return url => {
    const {
      onBegin,
      onProgress,
      onFinish
    } = options;
    onBegin && onBegin();
    return (0, _ApiRequest.default)(url, {
      type: "arraybuffer",
      onProgress: progress => {
        if (progress.direction === "download") {
          if (options.onProgress) {
            onProgress && onProgress(progress);
          }
        }
      }
    }).then(data => {
      if (options.onFinish) {
        onFinish && onFinish(data);
      }
      return data;
    });
  };
};
exports.default = _default;