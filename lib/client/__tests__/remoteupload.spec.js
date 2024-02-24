"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ApiMethod = require("../../api/ApiMethod");

var _createClient2 = _interopRequireDefault(require("../createClient"));

jest.mock("../../api/ApiMethod");

var _createClient = (0, _createClient2.default)("access_token"),
    remoteupload = _createClient.remoteupload;

var mockCurrentServer = {
  result: 0,
  hostname: "hostname"
};
var mockDownloadfileResponse = {
  metadata: [{
    name: "file.ext",
    size: 200
  }]
};
var mockUploadprogress = {
  finished: false,
  urlready: 0,
  result: 0,
  urlworking: 1,
  urlcount: 1,
  files: [{
    downloaded: 150,
    size: 200,
    url: "http://host/file.ext",
    status: "downloading"
  }]
};
var downloadfileCalled = jest.fn();
var progressCalled = jest.fn();
(0, _ApiMethod.one)(function (method) {
  return method === "currentserver";
}, (0, _ApiMethod.success)(mockCurrentServer));
(0, _ApiMethod.one)(function (method) {
  return method === "downloadfile";
}, (0, _ApiMethod.success)(mockDownloadfileResponse), downloadfileCalled);
(0, _ApiMethod.one)(function (method) {
  return method === "uploadprogress";
}, (0, _ApiMethod.success)(mockUploadprogress), progressCalled);
describe("remoteupload", function () {
  it("downloads file",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return remoteupload("http://host/file.ext", 0, {
              onProgress: function onProgress(progress) {
                expect(progress).toEqual({
                  all: {
                    downloaded: 150,
                    size: 200
                  },
                  files: [{
                    downloaded: 150,
                    size: 200,
                    url: "http://host/file.ext",
                    status: "downloading"
                  }]
                });
              }
            }).catch(function (e) {
              return e;
            });

          case 2:
            response = _context.sent;
            expect(response).toEqual({
              metadata: {
                name: "file.ext",
                size: 200
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});