"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClient;
var _invariant = _interopRequireDefault(require("invariant"));
var _deepAssign = _interopRequireDefault(require("deep-assign"));
var _ApiMethod = _interopRequireDefault(require("../api/ApiMethod"));
var methods = _interopRequireWildcard(require("./methods"));
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const defaultApiServer = "api.pcloud.com";
function createClient(token) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "oauth";
  let useProxy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  (0, _invariant.default)(["oauth", "pcloud"].indexOf(type) !== -1, "`type` must be either `oauth` or `pcloud`.");
  if (type === "oauth") {
    (0, _invariant.default)(typeof token === "string", "`token` is required.");
    (0, _invariant.default)(token.length, "`token` is required.");
  }

  // Local Params
  // apiServer, token, type

  function initialOptions(method) {
    let options = {
      params: {}
    };
    if ((0, _utils.isAuthMethod)(method) && token) {
      options.params["oauth" === type ? "access_token" : "auth"] = token;
    }
    return options;
  }
  function api(method) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let mergeOptions = (0, _deepAssign.default)({}, initialOptions(method), options);
    return (0, _ApiMethod.default)(method, mergeOptions).catch(error => {
      if (error.result === 500 && apiServer !== defaultApiServer) {
        // reset API server
        apiServer = defaultApiServer;
        // retry
        return api(method, options);
      } else {
        return Promise.reject(error);
      }
    });
  }
  function setupProxy() {
    return api("getapiserver", {}).then(response => {
      return apiServer = response.api[0];
    });
  }
  function setToken(newToken) {
    token = newToken;
  }

  // client api for end users
  let client = {
    api,
    setupProxy
  };
  let pcloudMethod;
  for (let method in methods) {
    if (Object.prototype.hasOwnProperty.call(methods, method)) {
      let baseMethod = methods[method];
      pcloudMethod = baseMethod({
        client,
        setToken,
        type
      });
      if (typeof pcloudMethod === "function") {
        client[method] = pcloudMethod;
      }
    }
  }
  if (useProxy) {
    setupProxy();
  }
  return client;
}