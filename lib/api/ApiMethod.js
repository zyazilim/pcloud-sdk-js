"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ApiMethod;
var _url = _interopRequireDefault(require("url"));
var _invariant = _interopRequireDefault(require("invariant"));
var _utils = require("../utils");
var _ApiRequest = _interopRequireDefault(require("./ApiRequest"));
const defaultApiServer = "eapi.pcloud.com";
function ApiMethod(method) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    apiServer = defaultApiServer,
    apiProtocol = "https",
    params = {},
    ...requestParams
  } = options;
  (0, _invariant.default)((0, _utils.isApiMethod)(method), "Method `" + method + "` is not pCloud API method.");
  (0, _invariant.default)(!(0, _utils.isAuthMethod)(method) || "auth" in params || "access_token" in params || "username" in params, "`auth` must be present for methods that require authentication.");
  const requestUrl = _url.default.format({
    protocol: apiProtocol,
    host: apiServer,
    pathname: method,
    query: params
  });
  if (requestParams.responseType === undefined) {
    requestParams.responseType = "json";
  }
  return (0, _ApiRequest.default)(requestUrl, requestParams).then(response => {
    if (requestParams.responseType === "json") {
      if (response.result !== 0) {
        return Promise.reject(response);
      }
    }
    return response;
  });
}