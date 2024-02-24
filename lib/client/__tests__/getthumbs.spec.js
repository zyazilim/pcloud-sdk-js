"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

jest.mock("../../api/ApiMethod");
var getThumbsSpy = jest.fn();
var receiveThumbSpy = jest.fn();
var image = "data:image/jpeg;base64,/9j/4AAQSkZ";
var exampleResult = ["2412453536|0|32x32|" + image, "3|6001|0"];
(0, _ApiMethod.one)(function (method) {
  return method === "getthumbs";
}, (0, _ApiMethod.text)(exampleResult.join("\n") + "\n"), getThumbsSpy);

var _createClient = (0, _createClient2.default)("testauth", "oauth", false),
    getthumbs = _createClient.getthumbs;

describe("getthumbs", function () {
  it("works correctly",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getthumbs([1, 2], receiveThumbSpy);

          case 2:
            response = _context.sent;
            expect(getThumbsSpy).toHaveBeenCalledTimes(1);
            expect(response[0].fileid).toBe(2412453536);
            expect(response[0].url).toBe(image);
            expect(response[1].fileid).toBe(3);
            expect(response[1].url).toBe(image);
            expect(_ApiMethod.default.mock.calls.length).toBe(1);
            expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
              access_token: "testauth",
              crop: 1,
              fileids: "1,2",
              size: "32x32",
              type: "auto"
            });
            expect(receiveThumbSpy).toHaveBeenCalledTimes(2);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});