"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireDefault(require("../ApiMethod"));

var _http = _interopRequireDefault(require("http"));

var _utils = require("../../../test/utils");

var _path = _interopRequireDefault(require("path"));

describe("upload trough api", function () {
  it("correcty uploads the file",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var server;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            server = _http.default.createServer(function (req, res) {
              (0, _utils.receiveMultipart)(req, res);
              server.close();
            }).listen(4545,
            /*#__PURE__*/
            (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee() {
              var result;
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _ApiMethod.default)("uploadfile", {
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

                    case 2:
                      result = _context.sent;
                      expect(result.files.length).toBe(1);
                      expect(result.files[0].size).toBe(3129022);
                      expect(result.files[0].originalFilename).toBe("other-image.jpg");

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});