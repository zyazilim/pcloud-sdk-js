"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiRequest = _interopRequireDefault(require("../ApiRequest"));
var _utils = require("../../../test/utils");
const mockReturnListfolder = {
  result: 0,
  metadata: {
    name: "/",
    folderid: 0,
    isfolder: true
  }
};
describe("request", () => {
  it("sends two calls to the request, but network is called once", () => {
    var networkOp = jest.fn();
    (0, _utils.superMockery)(/url/, (0, _utils.mockResponse)(mockReturnListfolder), networkOp);
    var req1 = (0, _ApiRequest.default)("https://hostname/url?param1=val1");
    var req2 = (0, _ApiRequest.default)("https://hostname/url?param1=val1");
    Promise.all([req1, req2]).then( /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      expect(yield req1).toEqual(mockReturnListfolder);
      expect(yield req2).toEqual(mockReturnListfolder);
      expect(networkOp).toHaveBeenCalledTimes(1);
      expect(networkOp).toHaveBeenCalledWith({
        param1: "val1"
      }, "https://hostname/url?param1=val1");
    }));
  });
});