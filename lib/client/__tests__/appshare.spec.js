"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
jest.mock("../../api/ApiMethod");
var shareSpy = jest.fn();
var cannotShareSpy = jest.fn();
(0, _ApiMethod.on)((method, _ref) => {
  let {
    params: {
      userid
    }
  } = _ref;
  return method === "sharefolder" && userid === 1;
}, (0, _ApiMethod.success)({}), shareSpy);
(0, _ApiMethod.one)((method, _ref2) => {
  let {
    params: {
      userid
    }
  } = _ref2;
  return method === "sharefolder" && userid === 2;
}, (0, _ApiMethod.error)(2009, "File not found."), cannotShareSpy);
describe("appshare", () => {
  it("sends correct data for appshare with edit", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const {
      appshare
    } = (0, _createClient.default)("testauth", "pcloud", false);
    const response = yield appshare(100, 1, "clientid", "edit");
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
  }));
  it("sends correct data for appshare with view", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const {
      appshare
    } = (0, _createClient.default)("testauth", "pcloud", false);
    const response = yield appshare(100, 1, "clientid", "view");
    expect(_ApiMethod.default.mock.calls[0][1].params).toMatchSnapshot();
    expect(response).toMatchSnapshot();
  }));
  it("throws for wrong token type", () => {
    const {
      appshare
    } = (0, _createClient.default)("testauth", "oauth", false);
    expect(() => {
      appshare(100, 1, "clientid");
    }).toThrowError("type `pcloud`");
  });
  it("throws for wrong token type", () => {
    const {
      appshare
    } = (0, _createClient.default)("testauth", "pcloud", false);
    expect(() => {
      appshare(100, 1);
    }).toThrowError("clientid");
  });
  it("throws for wrong token type", () => {
    const {
      appshare
    } = (0, _createClient.default)("testauth", "pcloud", false);
    expect(() => {
      appshare(100);
    }).toThrowError("userid");
  });
});