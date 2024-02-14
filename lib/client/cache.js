"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCache;
const defaultExpiry = 30;
function createCache() {
  let cacheObj = {};
  function cacheid(name) {
    var cacheid = name;
    var n = 0;
    if (arguments.length > 1 && typeof arguments[1] === "object") {
      for (n in arguments[1]) {
        if (Object.prototype.hasOwnProperty.call(arguments[1], n)) {
          cacheid += "-" + n + ":" + arguments[1][n];
        }
      }
    } else {
      for (n = 1; n < arguments.length; ++n) {
        if (Object.prototype.hasOwnProperty.call(arguments, n)) {
          cacheid += "-" + arguments[n];
        }
      }
    }
    return cacheid;
  }
  function get(key) {
    clean();
    if (has(key)) {
      return cacheObj[key].data;
    }
    return false;
  }
  function has(key) {
    return key in cacheObj && cacheObj[key].expiry > Date.now();
  }
  function getOrSet(key, val) {
    let expiry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultExpiry;
    if (!has(key)) {
      set(key, val, expiry);
    }
    return get(key);
  }
  function set(key, val) {
    let expiry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultExpiry;
    cacheObj[key] = {
      expiry: Date.now() + expiry * 1000,
      data: val
    };
  }
  function expire(key) {
    if (key in cacheObj) {
      delete cacheObj[key];
    }
  }
  function expireMatch(q) {
    let key;
    for (key in cacheObj) {
      if (key.match(q)) {
        expire(key);
      }
    }
  }
  function clean() {
    for (var n in cacheObj) {
      if (cacheObj[n].expiry < Date.now()) {
        delete cacheObj[n];
      }
    }
  }
  function cleanAll() {
    cacheObj = {};
  }
  return {
    cacheid,
    has,
    get,
    set,
    getOrSet,
    expire,
    expireMatch,
    clean,
    cleanAll
  };
}

/*
function debug(): CacheStore {
  return cacheObj;
}
*/