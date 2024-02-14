"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THUMB_URL = exports.THUMB_SIZE = exports.THUMB_RESULT = exports.THUMB_LINEID = exports.THUMB_FILEID = void 0;
exports.default = createParser;
const THUMB_FILEID = exports.THUMB_FILEID = 0;
const THUMB_RESULT = exports.THUMB_RESULT = 1;
const THUMB_SIZE = exports.THUMB_SIZE = 2;
const THUMB_LINEID = exports.THUMB_LINEID = 2;
const THUMB_URL = exports.THUMB_URL = 3;
function createParser() {
  let lastLinePos = 0;
  let thumbs = [];
  let nextLinePos;
  return text => {
    let setThumbs = [];

    // eslint-disable-next-line no-constant-condition
    while (1) {
      nextLinePos = text.indexOf("\n", lastLinePos + 1);
      if (nextLinePos === -1) {
        break;
      }
      let {
        result,
        size,
        url,
        fileid
      } = parseLines(text.substr(lastLinePos, nextLinePos - lastLinePos));
      lastLinePos = nextLinePos;
      if (result === 6001) {
        url = thumbs[parseInt(size, 10)].url;
        result = 0;
      }
      if (result === 0) {
        const thumb = {
          url,
          fileid
        };
        thumbs.push(thumb);
        setThumbs.push(thumb);
      }
    }
    return setThumbs;
  };
}
function parseLines(line) {
  const obj = line.split("|");
  return {
    result: parseInt(obj[THUMB_RESULT], 10),
    url: THUMB_URL in obj ? obj[THUMB_URL].trim() : "",
    fileid: parseInt(obj[THUMB_FILEID], 10),
    size: obj[THUMB_SIZE]
  };
}