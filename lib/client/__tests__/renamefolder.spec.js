"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

var _utils = require("../../../test/utils");

var _createClient = (0, _createClient2.default)("testauth"),
    renamefolder = _createClient.renamefolder;

var mockReturnRenamefolder = {
  result: 0,
  metadata: {
    name: "new name",
    isfolder: true,
    folderid: 380986338
  }
};
describe("renamefolder", function () {
  it("works correctly",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var query, response, _query, access_token, folderid, toname;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _utils.superMockery)(/renamefolder/, (0, _utils.mockResponse)(mockReturnRenamefolder), function (q) {
              query = q;
            });
            _context.next = 3;
            return renamefolder(380986338, "new name");

          case 3:
            response = _context.sent;
            expect(response.name).toBe("new name");
            expect(response.folderid).toBe(380986338);
            expect(response.isfolder).toBe(true);
            _query = query, access_token = _query.access_token, folderid = _query.folderid, toname = _query.toname;
            expect(access_token).toBe("testauth");
            expect(folderid).toBe("380986338");
            expect(toname).toBe("new name");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("throws on missing name",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var error;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return renamefolder(232232323);

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            error = _context2.t0;

          case 8:
            expect(error.toString()).toBe("Invariant Violation: `toname` is required.");

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  })));
  it("throws on missing id",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var error;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return renamefolder();

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            error = _context3.t0;

          case 8:
            expect(error.toString()).toBe("Invariant Violation: `folderid` must be number.");

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  })));
});