"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
jest.mock("../../api/ApiMethod");
var deleteSpy = jest.fn();
var fileNotFoundSpy = jest.fn();
(0, _ApiMethod.one)((method, _ref) => {
  let {
    params: {
      folderid
    }
  } = _ref;
  return method === "deletefolderrecursive" && folderid === 1;
}, (0, _ApiMethod.success)({}), deleteSpy);
(0, _ApiMethod.one)((method, _ref2) => {
  let {
    params: {
      folderid
    }
  } = _ref2;
  return method === "deletefolderrecursive" && folderid === 2;
}, (0, _ApiMethod.error)(2005, "Directory does not exist."), fileNotFoundSpy);
const {
  deletefolder
} = (0, _createClient.default)("testauth", "oauth", false);
describe("deletefolder", () => {
  it("sends correct data for delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield deletefolder(1);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(response).toBe(true);
    expect(_ApiMethod.default.mock.calls.length).toBe(1);
    expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
      folderid: 1,
      access_token: "testauth"
    });
  }));
  it("handles error correctly", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield deletefolder(2).catch(e => e);
    expect(fileNotFoundSpy).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      error: "Directory does not exist.",
      result: 2005
    });
    expect(_ApiMethod.default.mock.calls[1][1].params).toEqual({
      access_token: "testauth",
      folderid: 2
    });
  }));
});