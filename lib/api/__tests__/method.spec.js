"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireDefault(require("../ApiMethod"));
var _utils = require("../../../test/utils");
const mockReturnListfolder = {
  result: 0,
  metadata: {
    name: "/",
    folderid: 0,
    isfolder: true
  }
};
const mockReturnListfolderError = {
  result: 2005,
  error: "Directory does not exist."
};
describe("ApiMethod", () => {
  it("correctly passes the params and calls the success callback", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), q => {
      query = q;
    });
    const response = yield (0, _ApiMethod.default)("listfolder", {
      params: {
        auth: "testauth",
        folderid: 0
      }
    });
    expect(response.metadata.name).toBe("/");
    expect(response.metadata.folderid).toEqual(0);
    expect(response.metadata.isfolder).toBe(true);
    expect(query.auth).toBe("testauth");
    expect(query.folderid).toBe("0");
  }));
  it("returns error when folder is dummy", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolderError), q => {
      query = q;
    });
    const response = yield (0, _ApiMethod.default)("listfolder", {
      params: {
        access_token: "testauth",
        folderid: 1337
      }
    }).catch(data => data);
    expect(response.result).toBe(2005);
    expect(response.error).toBe("Directory does not exist.");
    expect(query.access_token).toBe("testauth");
    expect(parseInt(query.folderid, 10)).toBe(1337);
  }));
  it("responseType == text", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    var query;
    (0, _utils.superMockery)(/getthumbs/, "text result", q => {
      query = q;
    });
    const result = yield (0, _ApiMethod.default)("getthumbs", {
      params: {
        fileid: 100,
        access_token: "token"
      },
      responseType: "text"
    });
    expect(result).toBe("text result");
    expect(query).toEqual({
      fileid: "100",
      access_token: "token"
    });
  }));
});