"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ApiMethod = require("../../api/ApiMethod");
var _createClient = _interopRequireDefault(require("../createClient"));
jest.mock("../../api/ApiMethod");
const {
  remoteupload
} = (0, _createClient.default)("access_token");
const mockCurrentServer = {
  result: 0,
  hostname: "hostname"
};
const mockDownloadfileResponse = {
  metadata: [{
    name: "file.ext",
    size: 200
  }]
};
const mockUploadprogress = {
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
(0, _ApiMethod.one)(method => method === "currentserver", (0, _ApiMethod.success)(mockCurrentServer));
(0, _ApiMethod.one)(method => method === "downloadfile", (0, _ApiMethod.success)(mockDownloadfileResponse), downloadfileCalled);
(0, _ApiMethod.one)(method => method === "uploadprogress", (0, _ApiMethod.success)(mockUploadprogress), progressCalled);
describe("remoteupload", () => {
  it("downloads file", /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
    const response = yield remoteupload("http://host/file.ext", 0, {
      onProgress: progress => {
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
    }).catch(e => e);
    expect(response).toEqual({
      metadata: {
        name: "file.ext",
        size: 200
      }
    });
  }));
});