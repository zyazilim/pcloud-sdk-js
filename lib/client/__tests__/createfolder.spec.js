"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
jest.mock("../../api/ApiMethod");
const {
  createfolder
} = (0, _createClient.default)("testauth");
const mockReturnCreatefolder = {
  metadata: {
    path: "/folder name",
    name: "folder name",
    created: "Fri, 13 Jan 2017 19:07:11 +0000",
    ismine: true,
    thumb: false,
    modified: "Fri, 13 Jan 2017 19:07:11 +0000",
    id: "d111155556666",
    isshared: false,
    icon: "folder",
    isfolder: true,
    parentfolderid: 0,
    folderid: 111155556666
  }
};
var createdMock = jest.fn();
var alreadyExistsMock = jest.fn();
(0, _ApiMethod.one)((method, _ref) => {
  let {
    params: {
      folderid
    }
  } = _ref;
  return method === "createfolder" && folderid === 1;
}, (0, _ApiMethod.success)(mockReturnCreatefolder), createdMock);
(0, _ApiMethod.one)((method, _ref2) => {
  let {
    params: {
      folderid
    }
  } = _ref2;
  return method === "createfolder" && folderid === 1337;
}, (0, _ApiMethod.error)(2004, "File or folder already exists."), alreadyExistsMock);
describe("createfolder", () => {
  it("returns `metadata` when successful and has correct params", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield createfolder("folder name", 1);
    expect(response.name).toBe("folder name");
    expect(response.thumb).toBe(false);
    expect(response.isfolder).toBe(true);
    expect(response.folderid).toBe(111155556666);
    expect(createdMock).toHaveBeenCalledTimes(1);
    expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
      access_token: "testauth",
      name: "folder name",
      folderid: 1
    });
  }));
});
describe("throws error false when unsuccessful", () => {
  it("handles the error correctly", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield createfolder("folder name", 1337).catch(error => error);
    expect(response.error).toBe("File or folder already exists.");
    expect(response.result).toBe(2004);
    expect(alreadyExistsMock).toHaveBeenCalledTimes(1);
    expect(_ApiMethod.default.mock.calls[1][1].params).toEqual({
      access_token: "testauth",
      name: "folder name",
      folderid: 1337
    });
  }));
});