"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

var _utils = require("../../../test/utils");

var mockReturnDownloadFile = {
  result: 0,
  hash: 555544443333,
  size: 1234566,
  expires: "Fri, 13 Jan 2017 20:59:00 +0000",
  path: "/path-to/file.jpg",
  hosts: ["p-sf1.pcloud.com", "p-ams2.pcloud.com"]
};
describe("getfilelink api", function () {
  it("correctly get the url",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _createClient, getfilelink, query, result;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _createClient = (0, _createClient2.default)("token"), getfilelink = _createClient.getfilelink;
            (0, _utils.superMockery)(/getfilelink/, (0, _utils.mockResponse)(mockReturnDownloadFile), function (q) {
              query = q;
            });
            _context.next = 4;
            return getfilelink(1337).catch(function (e) {
              return e;
            });

          case 4:
            result = _context.sent;
            expect(result).toBe("https://p-sf1.pcloud.com/path-to/file.jpg");
            expect(query.access_token).toBe("token");
            expect(parseInt(query.fileid, 10)).toEqual(1337);
            expect(parseInt(query.forcedownload, 10)).toBe(1);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});