"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClient = _interopRequireDefault(require("../createClient"));
var _utils = require("../../../test/utils");
const mockReturnDownloadFile = {
  result: 0,
  hash: 555544443333,
  size: 1234566,
  expires: "Fri, 13 Jan 2017 20:59:00 +0000",
  path: "/path-to/file.jpg",
  hosts: ["p-sf1.pcloud.com", "p-ams2.pcloud.com"]
};
describe("getfilelink api", () => {
  it("correctly get the url", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const {
      getfilelink
    } = (0, _createClient.default)("token");
    var query;
    (0, _utils.superMockery)(/getfilelink/, (0, _utils.mockResponse)(mockReturnDownloadFile), q => {
      query = q;
    });
    const result = yield getfilelink(1337).catch(e => e);
    expect(result).toBe("https://p-sf1.pcloud.com/path-to/file.jpg");
    expect(query.access_token).toBe("token");
    expect(parseInt(query.fileid, 10)).toEqual(1337);
    expect(parseInt(query.forcedownload, 10)).toBe(1);
  }));
});