"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  userinfo
} = (0, _createClient.default)("access_token");
jest.mock("../../api/ApiMethod");
const mockReturnUserinfo = {
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
(0, _ApiMethod.one)(method => method === "userinfo", (0, _ApiMethod.success)(mockReturnUserinfo), userinfoCalled);
describe("userinfo", () => {
  it("handles correct result", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield userinfo().catch(e => e);
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
  }));
});