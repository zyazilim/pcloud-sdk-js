"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.error = error;
exports.on = on;
exports.one = one;
exports.success = success;
exports.text = text;
/**
 * Mock for api/method
 *
 * Exports the actual mock (apiMethod) as default and:
 *  on(match: (method, options) => boolean, respond: (method, params) => data, onFire?: () => void)
 *  one: same as on, but handler is removed upon first usage
 *
 * helpers that enhance response for use in the respond function
 * success(data: mixed) => success api payload
 * error(result: number, error: string) => error api payload
 * httpError(code: number, error: string) => network error payload
 *
 */
let handlers = [];

// $FlowExpectError
var _default = exports.default = jest.fn((method, options) => {
  let promised = null;
  for (let [match, respond, onFire] of handlers) {
    if (match(method, options)) {
      promised = respond(method, options);
      if (onFire) {
        onFire(method, options);
      }
      break;
    }
  }
  if (promised === null) {
    throw new Error("No route found for: ".concat(method, ". Handlers: ").concat(handlers.length, " "));
  }
  return promised;
});
function on(match, respond, onFire) {
  handlers.push([match, respond, onFire]);
}
function one(match, respond, onFire) {
  var me = [function () {
    const isMatch = match.apply(null, arguments);
    if (isMatch) {
      handlers.splice(handlers.indexOf(me), 1);
    }
    return isMatch;
  }, respond, onFire];
  handlers.push(me);
}
function text(data) {
  return () => Promise.resolve(data);
}
function success(data) {
  return () => {
    data.result = 0;
    return Promise.resolve(data);
  };
}
function error(result, error) {
  return (method, options) => {
    const errorObj = {
      result: result,
      error: error
    };
    if (options.onError) {
      options.onError(errorObj);
    }
    return Promise.reject(errorObj);
  };
}