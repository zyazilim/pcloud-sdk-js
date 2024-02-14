"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClient = _interopRequireDefault(require("../createClient"));
var _utils = require("../../../test/utils");
const {
  renamefolder
} = (0, _createClient.default)("testauth");
const mockReturnRenamefolder = {
  result: 0,
  metadata: {
    name: "new name",
    isfolder: true,
    folderid: 380986338
  }
};
describe("renamefolder", () => {
  it("works correctly", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/renamefolder/, (0, _utils.mockResponse)(mockReturnRenamefolder), q => {
      query = q;
    });
    const response = yield renamefolder(380986338, "new name");
    expect(response.name).toBe("new name");
    expect(response.folderid).toBe(380986338);
    expect(response.isfolder).toBe(true);
    const {
      access_token,
      folderid,
      toname
    } = query;
    expect(access_token).toBe("testauth");
    expect(folderid).toBe("380986338");
    expect(toname).toBe("new name");
  }));
  it("throws on missing name", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    let error;
    try {
      yield renamefolder(232232323);
    } catch (e) {
      error = e;
    }
    expect(error.toString()).toBe("Invariant Violation: `toname` is required.");
  }));
  it("throws on missing id", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    let error;
    try {
      yield renamefolder();
    } catch (e) {
      error = e;
    }
    expect(error.toString()).toBe("Invariant Violation: `folderid` must be number.");
  }));
});