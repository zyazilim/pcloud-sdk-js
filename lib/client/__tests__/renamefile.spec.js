"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClient = _interopRequireDefault(require("../createClient"));
var _utils = require("../../../test/utils");
const {
  renamefile
} = (0, _createClient.default)("testauth");
const mockReturnRenamefolder = {
  result: 0,
  metadata: {
    name: "new name",
    isfolder: false,
    fileid: 100
  }
};
describe("renamefolder", () => {
  it("works correctly", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/renamefile/, (0, _utils.mockResponse)(mockReturnRenamefolder), q => {
      query = q;
    });
    const response = yield renamefile(100, "new filename");
    expect(response.name).toBe("new name");
    expect(response.fileid).toBe(100);
    expect(response.isfolder).toBe(false);
    const {
      access_token,
      fileid,
      toname
    } = query;
    expect(access_token).toBe("testauth");
    expect(fileid).toBe("100");
    expect(toname).toBe("new filename");
  }));
  it("throws on missing name", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    let error;
    try {
      yield renamefile(232232323);
    } catch (e) {
      error = e;
    }
    expect(error.toString()).toBe("Invariant Violation: `toname` is required.");
  }));
  it("throws on missing id", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    let error;
    try {
      yield renamefile();
    } catch (e) {
      error = e;
    }
    expect(error.toString()).toBe("Invariant Violation: `fileid` must be number.");
  }));
});