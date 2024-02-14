"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiRequest = _interopRequireDefault(require("../../api/ApiRequest"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _default = () => function (filename) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return url => {
    if (options.onBegin) {
      options.onBegin();
    }
    return (0, _ApiRequest.default)(url, {
      type: "arraybuffer",
      pipe: _fs.default.createWriteStream(filename),
      onProgress: progress => {
        if (progress.direction === "download") {
          if (options.onProgress) {
            options.onProgress(progress);
          }
        }
      }
    }).then(() => {
      const file = {
        path: filename,
        name: _path.default.basename(filename),
        size: _fs.default.statSync(filename).size
      };
      if (options.onFinish) {
        options.onFinish(file);
      }
      return file;
    });
  };
};
exports.default = _default;