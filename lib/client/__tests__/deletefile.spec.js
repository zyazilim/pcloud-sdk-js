"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

jest.mock("../../api/ApiMethod");
var deleteSpy = jest.fn();
var fileNotFoundSpy = jest.fn();
(0, _ApiMethod.one)(function (method, _ref) {
  var fileid = _ref.params.fileid;
  return method === "deletefile" && fileid === 1;
}, (0, _ApiMethod.success)({}), deleteSpy);
(0, _ApiMethod.one)(function (method, _ref2) {
  var fileid = _ref2.params.fileid;
  return method === "deletefile" && fileid === 2;
}, (0, _ApiMethod.error)(2009, "File not found."), fileNotFoundSpy);

var _createClient = (0, _createClient2.default)("testauth", "oauth", false),
    deletefile = _createClient.deletefile;

describe("deletefile", function () {
  it("sends correct data for delete",
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
            return deletefile(1);

          case 2:
            response = _context.sent;
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);
            expect(_ApiMethod.default.mock.calls.length).toBe(1);
            expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
              fileid: 1,
              access_token: "testauth"
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("handles error correctly",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var response;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return deletefile(2).catch(function (e) {
              return e;
            });

          case 2:
            response = _context2.sent;
            expect(fileNotFoundSpy).toHaveBeenCalledTimes(1);
            expect(response).toEqual({
              error: "File not found.",
              result: 2009
            });
            expect(_ApiMethod.default.mock.calls[1][1].params).toEqual({
              access_token: "testauth",
              fileid: 2
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});