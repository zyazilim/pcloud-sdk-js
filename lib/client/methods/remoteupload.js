"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _invariant = _interopRequireDefault(require("invariant"));
var _utils = require("../../utils");
var _default = _ref => {
  let {
    client
  } = _ref;
  return function (urls) {
    let folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _invariant.default)(urls, "`file` is required.");
    (0, _invariant.default)(typeof urls === "string", "`file` must be supplied");
    const {
      onBegin,
      onProgress,
      onFinish
    } = options;
    const progressId = "pcloud-sdk-remote-" + (0, _utils.uniqueNumber)() + "-" + (0, _utils.randomNumber)();
    let progressTimeout;
    const progress = apiServer => {
      pollProgress(apiServer);
      progressTimeout = setTimeout(() => progress(apiServer), 200);
    };
    const stopProgress = () => {
      if (progressTimeout) {
        clearTimeout(progressTimeout);
      }
    };
    const pollProgress = apiServer => {
      client.api("uploadprogress", {
        params: {
          progresshash: progressId,
          apiServer
        }
      }).then(_ref2 => {
        let {
          files
        } = _ref2;
        return onProgress && onProgress(calculateProgress(files));
      }).catch(_ref3 => {
        let {
          result,
          error
        } = _ref3;
        if (result === 1900) {
          onProgress && onProgress(calculateProgress());
        }
        console.log(error);
      });
    };
    onBegin && onBegin();
    return client.api("currentserver").then(_ref4 => {
      let {
        hostname
      } = _ref4;
      const promise = client.api("downloadfile", {
        method: "post",
        params: {
          folderid: folderid,
          progresshash: progressId,
          nopartial: 1,
          url: urls,
          apiServer: hostname
        }
      });
      progress(hostname);
      return promise;
    }).then(_ref5 => {
      let {
        metadata
      } = _ref5;
      stopProgress();
      onFinish && onFinish({
        metadata: metadata[0]
      });
      return {
        metadata: metadata[0]
      };
    }).catch(err => {
      stopProgress();
      console.log("Error", err);
    });
  };
};
exports.default = _default;
const calculateProgress = function () {
  let files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    all: {
      downloaded: files.reduce((n, _ref6) => {
        let {
          downloaded = 0
        } = _ref6;
        return n + downloaded;
      }, 0),
      size: files.reduce((n, _ref7) => {
        let {
          size = 0
        } = _ref7;
        return n + size;
      }, 0)
    },
    files: files
  };
};