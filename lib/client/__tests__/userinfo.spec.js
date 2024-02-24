"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

var _createClient = (0, _createClient2.default)("access_token"),
    userinfo = _createClient.userinfo;

jest.mock("../../api/ApiMethod");
var mockReturnUserinfo = {
  emailverified: true,
  userid: 100,
  usedquota: 10041806938,
  quota: 11811160064,
  result: 0,
  premium: false,
  publiclinkquota: 53687091200,
  language: "en",
  email: "user@mail.com",
  registered: "Tue, 01 Oct 2013 17:50:23 +0000"
};
var userinfoCalled = jest.fn();
(0, _ApiMethod.one)(function (method) {
  return method === "userinfo";
}, (0, _ApiMethod.success)(mockReturnUserinfo), userinfoCalled);
describe("userinfo", function () {
  it("handles correct result",
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
            return userinfo().catch(function (e) {
              return e;
            });

          case 2:
            response = _context.sent;
            expect(response.userid).toBe(100);
            expect(response.usedquota).toBe(10041806938);
            expect(response.quota).toBe(11811160064);
            expect(_ApiMethod.default).toHaveBeenCalledTimes(1);
            expect(_ApiMethod.default).toHaveBeenCalledWith("userinfo", {
              apiServer: "api.pcloud.com",
              params: {
                access_token: "access_token"
              }
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});