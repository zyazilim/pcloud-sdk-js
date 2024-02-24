"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));

var _createClient6 = _interopRequireDefault(require("../createClient"));

jest.mock("../../api/ApiMethod");
var shareSpy = jest.fn();
var cannotShareSpy = jest.fn();
(0, _ApiMethod.on)(function (method, _ref) {
  var userid = _ref.params.userid;
  return method === "sharefolder" && userid === 1;
}, (0, _ApiMethod.success)({}), shareSpy);
(0, _ApiMethod.one)(function (method, _ref2) {
  var userid = _ref2.params.userid;
  return method === "sharefolder" && userid === 2;
}, (0, _ApiMethod.error)(2009, "File not found."), cannotShareSpy);
describe("appshare", function () {
  it("sends correct data for appshare with edit",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _createClient, appshare, response;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _createClient = (0, _createClient6.default)("testauth", "pcloud", false), appshare = _createClient.appshare;
            _context.next = 3;
            return appshare(100, 1, "clientid", "edit");

          case 3:
            response = _context.sent;
            expect(shareSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);
            expect(_ApiMethod.default.mock.calls.length).toBe(1);
            expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
              auth: "testauth",
              client_id: "clientid",
              folderid: 100,
              permissions: 7,
              userid: 1
            });
            expect(_ApiMethod.default.mock.calls[0][1].params).toMatchSnapshot();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("sends correct data for appshare with view",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var _createClient2, appshare, response;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _createClient2 = (0, _createClient6.default)("testauth", "pcloud", false), appshare = _createClient2.appshare;
            _context2.next = 3;
            return appshare(100, 1, "clientid", "view");

          case 3:
            response = _context2.sent;
            expect(_ApiMethod.default.mock.calls[0][1].params).toMatchSnapshot();
            expect(response).toMatchSnapshot();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("throws for wrong token type", function () {
    var _createClient3 = (0, _createClient6.default)("testauth", "oauth", false),
        appshare = _createClient3.appshare;

    expect(function () {
      appshare(100, 1, "clientid");
    }).toThrowError("type `pcloud`");
  });
  it("throws for wrong token type", function () {
    var _createClient4 = (0, _createClient6.default)("testauth", "pcloud", false),
        appshare = _createClient4.appshare;

    expect(function () {
      appshare(100, 1);
    }).toThrowError("clientid");
  });
  it("throws for wrong token type", function () {
    var _createClient5 = (0, _createClient6.default)("testauth", "pcloud", false),
        appshare = _createClient5.appshare;

    expect(function () {
      appshare(100);
    }).toThrowError("userid");
  });
});