"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _invariant = _interopRequireDefault(require("invariant"));
var _utils = require("../../utils");
const permissionsMap = {
  view: 0,
  edit: 7
};
var _default = _ref => {
  let {
    client
  } = _ref;
  return function (folderid, mail) {
    let access = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "view";
    let message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    (0, _invariant.default)(typeof folderid === "number", "`folderid` must be number.");
    (0, _invariant.default)(folderid !== 0, "`folderid` cannot be 0.");
    (0, _invariant.default)(["view", "edit"].indexOf(access) != -1, "`permissions` can be either `view` or `edit`.");
    (0, _invariant.default)(mail, "`mail` is required.");
    (0, _invariant.default)(typeof mail === "string", "`mail` is required.");
    (0, _invariant.default)((0, _utils.isEmail)(mail), "`mail` must be either number or a valid mail address.");
    let params = {};
    params.folderid = folderid;
    params.permissions = permissionsMap[access];
    params.mail = mail;
    if (message) {
      params.message = message;
    }
    return client.api("sharefolder", {
      params: params
    }).then(() => true);
  };
};
exports.default = _default;