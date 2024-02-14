"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = httpProgressMiddleware;
function httpProgressMiddleware(req) {
  let loaded = 0;
  let total = 0;
  req.on("response", res => {
    if (total === 0) {
      total = res.headers["content-length"];
    }
    res.on("data", function (data) {
      loaded += data.length;
      req.emit("progress", {
        direction: "download",
        loaded: loaded,
        total: total
      });
    });
  });
}