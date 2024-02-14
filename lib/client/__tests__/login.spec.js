"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
jest.mock("../../api/ApiMethod");
const {
  login,
  listfolder
} = (0, _createClient.default)(false, "pcloud");
const mockReturnUserinfo = {
  auth: "acccess_token_string"
};
const mockListfolder = {
  metadata: {
    name: "/",
    folderid: 0,
    isfolder: true,
    contents: []
  }
};
var loginCalled = jest.fn();
var listfolderCalled = jest.fn();
(0, _ApiMethod.one)((method, _ref) => {
  let {
    params
  } = _ref;
  return method === "userinfo" && params.getauth === 1;
}, (0, _ApiMethod.success)(mockReturnUserinfo), loginCalled);
(0, _ApiMethod.one)(method => method === "listfolder", (0, _ApiMethod.success)(mockListfolder), listfolderCalled);
describe("login", () => {
  it("gets auth from api and saves it for future calls", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield login("mail@mail.com", "password").catch(e => e);
    expect(response).toBe("acccess_token_string");
    expect(_ApiMethod.default).toHaveBeenCalledTimes(1);
    expect(_ApiMethod.default).toHaveBeenCalledWith("userinfo", {
      apiServer: "api.pcloud.com",
      params: {
        getauth: 1,
        logout: 1,
        password: "password",
        username: "mail@mail.com"
      }
    });
    const folder = yield listfolder(0);
    expect(folder.name).toBe("/");
    expect(folder.folderid).toBe(0);
    expect(listfolderCalled).toHaveBeenCalledTimes(1);
    expect(listfolderCalled).toHaveBeenCalledWith("listfolder", {
      apiServer: "api.pcloud.com",
      params: {
        auth: "acccess_token_string",
        folderid: 0
      }
    });
  }));
});