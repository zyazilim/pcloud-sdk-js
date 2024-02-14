"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _url = _interopRequireDefault(require("url"));
var _invariant = _interopRequireDefault(require("invariant"));
var _ApiMethod = _interopRequireDefault(require("../api/ApiMethod"));
var _functions = require("../utils/functions");
const protocol = "https";
const host = "my.pcloud.com";
const path = "/oauth2/authorize";
function buildOauthUrl(query) {
  return _url.default.format({
    protocol: protocol,
    hostname: host,
    pathname: path,
    query: query
  });
}
function initOauthToken(options) {
  const {
    client_id = null,
    redirect_uri = null,
    receiveToken = null,
    response_type = "token"
  } = options;
  (0, _invariant.default)(client_id, "`client_id` is required.");
  (0, _invariant.default)(redirect_uri, "`redirect_uri` is required.");
  (0, _invariant.default)(receiveToken, "`receiveToken` is required.");
  const oauthUrl = buildOauthUrl({
    redirect_uri: redirect_uri,
    client_id: client_id,
    response_type: response_type
  });
  window.open(oauthUrl, "oauth", "width=680,height=700");
  window.__setPcloudToken = function (token, locationid) {
    receiveToken(token, locationid);
    delete window.__setPcloudToken;
  };
}
function initOauthPollToken(options) {
  const request_id = (0, _functions.generateRandomString)(40);
  const {
    client_id = null,
    receiveToken = null,
    onError = null
  } = options;
  (0, _invariant.default)(client_id, "`client_id` is required.");
  (0, _invariant.default)(receiveToken, "`receiveToken` is required.");
  (0, _invariant.default)(onError, "`onError` is required.");
  const oauthUrl = buildOauthUrl({
    request_id: request_id,
    client_id: client_id,
    response_type: "poll_token"
  });
  window.open(oauthUrl, "", "width=680,height=700");
  (0, _ApiMethod.default)("oauth2_token", {
    apiServer: "eapi.pcloud.com",
    params: {
      client_id: client_id,
      request_id: request_id
    }
  }).then(res => {
    receiveToken(res.access_token, res.locationid);
  }).catch(err => {
    onError(err);
  });
  (0, _ApiMethod.default)("oauth2_token", {
    apiServer: "api.pcloud.com",
    params: {
      client_id: client_id,
      request_id: request_id
    }
  }).then(res => {
    receiveToken(res.access_token, res.locationid);
  }).catch(err => {
    onError(err);
  });
}
function popup() {
  const matchToken = location.hash.match(/access_token=([^&]+)/);
  const matchCode = location.search.match(/code=([^&]+)/);
  const locationIdMatch = location.hash.match(/locationid=([^&]+)/);
  const locationid = locationIdMatch ? locationIdMatch[1] : null;
  const token = matchToken ? matchToken[1] : matchCode ? matchCode[1] : null;
  if (token) {
    window.opener.__setPcloudToken(token, locationid);
    window.close();
  }
}
function getTokenFromCode(code, client_id, app_secret) {
  return (0, _ApiMethod.default)("oauth2_token", {
    params: {
      client_id: client_id,
      client_secret: app_secret,
      code: code
    }
  });
}
var _default = exports.default = {
  initOauthToken,
  initOauthPollToken,
  popup,
  getTokenFromCode
};