"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _invariant = _interopRequireDefault(require("invariant"));
var _thumbs = _interopRequireDefault(require("../../utils/thumbs"));
var _default = _ref => {
  let {
    client
  } = _ref;
  return function (fileids, receiveThumb) {
    let thumbType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "auto";
    let size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "32x32";
    (0, _invariant.default)(typeof fileids === "object" && "length" in fileids && fileids.length, "`fileids` is required, must be array of numbers.");
    (0, _invariant.default)(["auto", "png", "jpg"].indexOf(thumbType) !== -1, 'thumbType must be one of: "auto", "png", "jpg".');
    (0, _invariant.default)(["32x32", "120x120"].indexOf(size) !== -1, 'size must be one of: "32x32", "120x120".');
    (0, _invariant.default)(receiveThumb, "`receiveThumb` is required.");
    (0, _invariant.default)(typeof receiveThumb === "function", "`receiveThumb` must be a function.");
    let thumbs = [];
    const parser = (0, _thumbs.default)();
    return client.api("getthumbs", {
      responseType: "text",
      params: {
        fileids: fileids.join(","),
        type: thumbType,
        size: size,
        crop: 1
      },
      onProgress: progress => {
        const progressThumbs = parser(progress.currentTarget.responseText);
        thumbs = thumbs.concat(progressThumbs);
        progressThumbs.forEach(receiveThumb);
      }
    }).then(response => {
      const responseThumbs = parser(response);
      responseThumbs.forEach(receiveThumb);
      return thumbs.concat(responseThumbs);
    });
  };
};
exports.default = _default;