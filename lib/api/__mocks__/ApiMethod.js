"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.one = one;
exports.text = text;
exports.success = success;
exports.error = error;
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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
var handlers = []; // $FlowExpectError

var _default = jest.fn(function (method, options) {
  var promised = null;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray2.default)(_step.value, 3),
          match = _step$value[0],
          respond = _step$value[1],
          onFire = _step$value[2];

      if (match(method, options)) {
        promised = respond(method, options);

        if (onFire) {
          onFire(method, options);
        }

        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (promised === null) {
    throw new Error("No route found for: ".concat(method, ". Handlers: ").concat(handlers.length, " "));
  }

  return promised;
});

exports.default = _default;

function on(match, respond, onFire) {
  handlers.push([match, respond, onFire]);
}

function one(match, respond, onFire) {
  var me = [function () {
    var isMatch = match.apply(null, arguments);

    if (isMatch) {
      handlers.splice(handlers.indexOf(me), 1);
    }

    return isMatch;
  }, respond, onFire];
  handlers.push(me);
}

function text(data) {
  return function () {
    return Promise.resolve(data);
  };
}

function success(data) {
  return function () {
    data.result = 0;
    return Promise.resolve(data);
  };
}

function error(result, error) {
  return function (method, options) {
    var errorObj = {
      result: result,
      error: error
    };

    if (options.onError) {
      options.onError(errorObj);
    }

    return Promise.reject(errorObj);
  };
}