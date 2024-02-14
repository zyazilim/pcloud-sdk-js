"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireDefault(require("../ApiMethod"));
var _http = _interopRequireDefault(require("http"));
var _utils = require("../../../test/utils");
var _path = _interopRequireDefault(require("path"));
describe("upload trough api", () => {
  it("correcty uploads the file", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const server = _http.default.createServer((req, res) => {
      (0, _utils.receiveMultipart)(req, res);
      server.close();
    }).listen(4545, /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      const result = yield (0, _ApiMethod.default)("uploadfile", {
        params: {
          auth: "auth_token",
          folderid: 0
        },
        httpMethod: "post",
        apiServer: "127.0.0.1:4545",
        apiProtocol: "http",
        method: "post",
        files: [{
          name: "other-image.jpg",
          file: _path.default.resolve(__dirname, "../../../examples/node/files/image.jpg")
        }]
      });
      expect(result.files.length).toBe(1);
      expect(result.files[0].size).toBe(3129022);
      expect(result.files[0].originalFilename).toBe("other-image.jpg");
    }));
  }));
});