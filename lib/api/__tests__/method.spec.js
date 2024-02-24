"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireDefault(require("../ApiMethod"));

var _utils = require("../../../test/utils");

var mockReturnListfolder = {
  result: 0,
  metadata: {
    name: "/",
    folderid: 0,
    isfolder: true
  }
};
var mockReturnListfolderError = {
  result: 2005,
  error: "Directory does not exist."
};
describe("ApiMethod", function () {
  it("correctly passes the params and calls the success callback",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var query, response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), function (q) {
              query = q;
            });
            _context.next = 3;
            return (0, _ApiMethod.default)("listfolder", {
              params: {
                auth: "testauth",
                folderid: 0
              }
            });

          case 3:
            response = _context.sent;
            expect(response.metadata.name).toBe("/");
            expect(response.metadata.folderid).toEqual(0);
            expect(response.metadata.isfolder).toBe(true);
            expect(query.auth).toBe("testauth");
            expect(query.folderid).toBe("0");

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("returns error when folder is dummy",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var query, response;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolderError), function (q) {
              query = q;
            });
            _context2.next = 3;
            return (0, _ApiMethod.default)("listfolder", {
              params: {
                access_token: "testauth",
                folderid: 1337
              }
            }).catch(function (data) {
              return data;
            });

          case 3:
            response = _context2.sent;
            expect(response.result).toBe(2005);
            expect(response.error).toBe("Directory does not exist.");
            expect(query.access_token).toBe("testauth");
            expect(parseInt(query.folderid, 10)).toBe(1337);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("responseType == text",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var query, result;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _utils.superMockery)(/getthumbs/, "text result", function (q) {
              query = q;
            });
            _context3.next = 3;
            return (0, _ApiMethod.default)("getthumbs", {
              params: {
                fileid: 100,
                access_token: "token"
              },
              responseType: "text"
            });

          case 3:
            result = _context3.sent;
            expect(result).toBe("text result");
            expect(query).toEqual({
              fileid: "100",
              access_token: "token"
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});