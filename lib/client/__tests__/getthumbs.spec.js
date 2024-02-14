"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = _interopRequireWildcard(require("../../api/ApiMethod"));
var _createClient = _interopRequireDefault(require("../createClient"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
jest.mock("../../api/ApiMethod");
var getThumbsSpy = jest.fn();
var receiveThumbSpy = jest.fn();
const image = "data:image/jpeg;base64,/9j/4AAQSkZ";
const exampleResult = ["2412453536|0|32x32|" + image, "3|6001|0"];
(0, _ApiMethod.one)(method => method === "getthumbs", (0, _ApiMethod.text)(exampleResult.join("\n") + "\n"), getThumbsSpy);
const {
  getthumbs
} = (0, _createClient.default)("testauth", "oauth", false);
describe("getthumbs", () => {
  it("works correctly", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield getthumbs([1, 2], receiveThumbSpy);
    expect(getThumbsSpy).toHaveBeenCalledTimes(1);
    expect(response[0].fileid).toBe(2412453536);
    expect(response[0].url).toBe(image);
    expect(response[1].fileid).toBe(3);
    expect(response[1].url).toBe(image);
    expect(_ApiMethod.default.mock.calls.length).toBe(1);
    expect(_ApiMethod.default.mock.calls[0][1].params).toEqual({
      access_token: "testauth",
      crop: 1,
      fileids: "1,2",
      size: "32x32",
      type: "auto"
    });
    expect(receiveThumbSpy).toHaveBeenCalledTimes(2);
  }));
});