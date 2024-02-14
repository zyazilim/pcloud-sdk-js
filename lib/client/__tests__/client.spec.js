"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
jest.mock("../../api/ApiMethod");
var gotProxyServer = jest.fn();
var receivedNetworkError = jest.fn();
var retried = jest.fn();
(0, _ApiMethod.one)(method => method === "getapiserver", (0, _ApiMethod.success)({
  api: ["broken-api.pcloud.com"]
}), gotProxyServer);
(0, _ApiMethod.on)((method, options) => options.apiServer === "broken-api.pcloud.com", (0, _ApiMethod.error)(500, "Network Error."), receivedNetworkError);
(0, _ApiMethod.on)((method, options) => method === "listfolder" && options.apiServer === "api.pcloud.com", (0, _ApiMethod.success)({
  metadata: {
    name: "/",
    folderid: 0
  }
}), retried);
const {
  listfolder,
  setupProxy
} = (0, _createClient.default)("testauth", "oauth", false);
beforeAll( /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  yield setupProxy();
}));
describe("client, proxy", () => {
  it("sets proxy, recovers on http error and retries the call", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield listfolder(0);
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
  }));
});