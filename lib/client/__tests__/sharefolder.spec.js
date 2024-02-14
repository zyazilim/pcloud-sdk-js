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
      mail
    }
  } = _ref;
  return method === "sharefolder" && mail === "test@fakemail.com";
}, (0, _ApiMethod.success)({}), shareSpy);
(0, _ApiMethod.one)((method, _ref2) => {
  let {
    params: {
      mail
    }
  } = _ref2;
  return method === "sharefolder" && mail === 2;
}, (0, _ApiMethod.error)(2009, "File not found."), cannotShareSpy);
const {
  sharefolder
} = (0, _createClient.default)("testauth", "pcloud", false);
describe("sharefolder", () => {
  it("sends correct data for sharefolder", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield sharefolder(100, "test@fakemail.com");
    expect(shareSpy).toHaveBeenCalledTimes(1);
    expect(response).toBe(true);
    expect(_ApiMethod.default.mock.calls.length).toBe(1);
    expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
      auth: "testauth",
      folderid: 100,
      permissions: 0,
      mail: "test@fakemail.com"
    });
  }));
  it("correctly sends params for edit", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield sharefolder(100, "test@fakemail.com", "edit");
    expect(response).toMatchSnapshot();
    expect(_ApiMethod.default.mock.calls[0][1].params).toMatchSnapshot();
  }));
  it("throws for wrong permissions", () => {
    expect(() => {
      sharefolder(100, "test@fakemail.com", 5);
    }).toThrowError("permissions");
  });
  it("throws for wrong token type", () => {
    expect(() => {
      sharefolder(100);
    }).toThrowError("mail");
  });
});