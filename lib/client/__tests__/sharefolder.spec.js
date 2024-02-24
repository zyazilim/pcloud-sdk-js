"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

jest.mock("../../api/ApiMethod");
var shareSpy = jest.fn();
var cannotShareSpy = jest.fn();
(0, _ApiMethod.on)(function (method, _ref) {
  var mail = _ref.params.mail;
  return method === "sharefolder" && mail === "test@fakemail.com";
}, (0, _ApiMethod.success)({}), shareSpy);
(0, _ApiMethod.one)(function (method, _ref2) {
  var mail = _ref2.params.mail;
  return method === "sharefolder" && mail === 2;
}, (0, _ApiMethod.error)(2009, "File not found."), cannotShareSpy);

var _createClient = (0, _createClient2.default)("testauth", "pcloud", false),
    sharefolder = _createClient.sharefolder;

describe("sharefolder", function () {
  it("sends correct data for sharefolder",
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
            return sharefolder(100, "test@fakemail.com");

          case 2:
            response = _context.sent;
            expect(shareSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);
            expect(_ApiMethod.default.mock.calls.length).toBe(1);
            expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
              auth: "testauth",
              folderid: 100,
              permissions: 0,
              mail: "test@fakemail.com"
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("correctly sends params for edit",
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
            return sharefolder(100, "test@fakemail.com", "edit");

          case 2:
            response = _context2.sent;
            expect(response).toMatchSnapshot();
            expect(_ApiMethod.default.mock.calls[0][1].params).toMatchSnapshot();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("throws for wrong permissions", function () {
    expect(function () {
      sharefolder(100, "test@fakemail.com", 5);
    }).toThrowError("permissions");
  });
  it("throws for wrong token type", function () {
    expect(function () {
      sharefolder(100);
    }).toThrowError("mail");
  });
});