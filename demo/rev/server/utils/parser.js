"use strict";

function parseId(id) {
  var tmpId = parseInt(id);
  var retId = isNaN(tmpId) ? undefined : tmpId;
  return retId;
}

module.exports = {
  parseId: parseId
};