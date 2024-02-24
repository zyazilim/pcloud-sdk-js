"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

jest.mock("../../api/ApiMethod");
var gotProxyServer = jest.fn();
var receivedNetworkError = jest.fn();
var retried = jest.fn();
(0, _ApiMethod.one)(function (method) {
  return method === "getapiserver";
}, (0, _ApiMethod.success)({
  api: ["broken-api.pcloud.com"]
}), gotProxyServer);
(0, _ApiMethod.on)(function (method, options) {
  return options.apiServer === "broken-api.pcloud.com";
}, (0, _ApiMethod.error)(500, "Network Error."), receivedNetworkError);
(0, _ApiMethod.on)(function (method, options) {
  return method === "listfolder" && options.apiServer === "api.pcloud.com";
}, (0, _ApiMethod.success)({
  metadata: {
    name: "/",
    folderid: 0
  }
}), retried);

var _createClient = (0, _createClient2.default)("testauth", "oauth", false),
    listfolder = _createClient.listfolder,
    setupProxy = _createClient.setupProxy;

beforeAll(
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return setupProxy();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe("client, proxy", function () {
  it("sets proxy, recovers on http error and retries the call",
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
            return listfolder(0);

          case 2:
            response = _context2.sent;
            expect(gotProxyServer).toHaveBeenCalledTimes(1);
            expect(receivedNetworkError).toHaveBeenCalledTimes(1);
            expect(retried).toHaveBeenCalledTimes(1);
            expect(response.folderid).toBe(0);
            expect(response.name).toBe("/");
            expect(_ApiMethod.default.mock.calls.length).toBe(3);
            expect(_ApiMethod.default.mock.calls[0][0]).toBe("getapiserver");
            expect(_ApiMethod.default.mock.calls[0][1].apiServer).toBe("api.pcloud.com");
            expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({});
            expect(_ApiMethod.default.mock.calls[1][0]).toBe("listfolder");
            expect(_ApiMethod.default.mock.calls[1][1].apiServer).toBe("broken-api.pcloud.com");
            expect(_ApiMethod.default.mock.calls[1][1].params).toEqual({
              access_token: "testauth",
              folderid: 0
            });
            expect(_ApiMethod.default.mock.calls[2][0]).toBe("listfolder");
            expect(_ApiMethod.default.mock.calls[2][1].apiServer).toBe("api.pcloud.com");
            expect(_ApiMethod.default.mock.calls[2][1].params).toEqual({
              access_token: "testauth",
              folderid: 0
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});