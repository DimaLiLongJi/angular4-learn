"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ftof;
function ftof(list, f1, val, f2) {
  var found = list.find(function (l) {
    return l[f1] === val;
  });
  return found && found[f2];
}