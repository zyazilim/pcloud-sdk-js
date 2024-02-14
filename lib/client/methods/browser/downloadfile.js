"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = _ref => {
  let {
    client
  } = _ref;
  return function (fileid, filename) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      getfilelink,
      download
    } = client;
    return getfilelink(fileid).then(download(filename, options));
  };
};
exports.default = _default;