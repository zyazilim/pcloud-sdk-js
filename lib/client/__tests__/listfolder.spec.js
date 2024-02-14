"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClient = _interopRequireDefault(require("../createClient"));
var _utils = require("../../../test/utils");
const {
  listfolder
} = (0, _createClient.default)("testauth");
const mockReturnListfolder = {
  result: 0,
  metadata: {
    name: "/",
    folderid: 0,
    isfolder: true,
    icon: 20
  }
};
const mockReturnFolderNotFound = {
  result: 2005,
  error: "Directory does not exist."
};
describe("listfolder", () => {
  it("list the folder", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), q => {
      query = q;
    });
    const response = yield listfolder(0);
    expect(response.name).toBe("/");
    expect(response.folderid).toBe(0);
    expect(response.isfolder).toBe(true);
    const {
      access_token,
      folderid
    } = query;
    expect(access_token).toBe("testauth");
    expect(folderid).toBe("0");
  }));
  it("list the folder with optional parameters", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), q => {
      query = q;
    });
    const response = yield listfolder(0, {
      iconformat: "id"
    });
    expect(response.name).toBe("/");
    expect(response.folderid).toBe(0);
    expect(response.isfolder).toBe(true);
    expect(response.icon).toBe(20);
    const {
      access_token,
      folderid,
      iconformat
    } = query;
    expect(access_token).toBe("testauth");
    expect(folderid).toBe("0");
    expect(iconformat).toBe("id");
  }));
  it("on wrong folderid returns error 2005", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnFolderNotFound), q => {
      query = q;
    });
    const response = yield listfolder(1337).catch(e => e);
    expect(response.error).toBe("Directory does not exist.");
    expect(response.result).toBe(2005);
    const {
      access_token,
      folderid
    } = query;
    expect(access_token).toBe("testauth");
    expect(folderid).toBe("1337");
  }));
});