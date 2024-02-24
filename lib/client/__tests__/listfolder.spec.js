"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClient2 = _interopRequireDefault(require("../createClient"));

var _utils = require("../../../test/utils");

var _createClient = (0, _createClient2.default)("testauth"),
    listfolder = _createClient.listfolder;

var mockReturnListfolder = {
  result: 0,
  metadata: {
    name: "/",
    folderid: 0,
    isfolder: true,
    icon: 20
  }
};
var mockReturnFolderNotFound = {
  result: 2005,
  error: "Directory does not exist."
};
describe("listfolder", function () {
  it("list the folder",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var query, response, _query, access_token, folderid;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), function (q) {
              query = q;
            });
            _context.next = 3;
            return listfolder(0);

          case 3:
            response = _context.sent;
            expect(response.name).toBe("/");
            expect(response.folderid).toBe(0);
            expect(response.isfolder).toBe(true);
            _query = query, access_token = _query.access_token, folderid = _query.folderid;
            expect(access_token).toBe("testauth");
            expect(folderid).toBe("0");

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("list the folder with optional parameters",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var query, response, _query2, access_token, folderid, iconformat;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), function (q) {
              query = q;
            });
            _context2.next = 3;
            return listfolder(0, {
              iconformat: "id"
            });

          case 3:
            response = _context2.sent;
            expect(response.name).toBe("/");
            expect(response.folderid).toBe(0);
            expect(response.isfolder).toBe(true);
            expect(response.icon).toBe(20);
            _query2 = query, access_token = _query2.access_token, folderid = _query2.folderid, iconformat = _query2.iconformat;
            expect(access_token).toBe("testauth");
            expect(folderid).toBe("0");
            expect(iconformat).toBe("id");

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("on wrong folderid returns error 2005",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var query, response, _query3, access_token, folderid;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnFolderNotFound), function (q) {
              query = q;
            });
            _context3.next = 3;
            return listfolder(1337).catch(function (e) {
              return e;
            });

          case 3:
            response = _context3.sent;
            expect(response.error).toBe("Directory does not exist.");
            expect(response.result).toBe(2005);
            _query3 = query, access_token = _query3.access_token, folderid = _query3.folderid;
            expect(access_token).toBe("testauth");
            expect(folderid).toBe("1337");

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});