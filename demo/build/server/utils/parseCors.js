'use strict';

module.exports = function parseOrigin(corsConfig) {
  //get origin data, and its type
  var originData = corsConfig.origin;
  var originType = typeof originData;
  //parse differs with types
  if (originType === 'string') {
    return {
      origin: parseOneOrigin(originData) //a single string can be parsed directly
    };
  } else if (originType === 'object') {
    var newOrigin = []; // an array would be parsed separatly to a new array
    for (var i = 0; i < originData.length; i++) {
      newOrigin.push(parseOneOrigin(originData[i]));
    }
    corsConfig.origin = newOrigin;
    return corsConfig;
  }
};

//parse one origin string
function parseOneOrigin(origin) {
  var checkReg = /^\/.*\/$/;
  //return RegExp if it is one, else return string
  if (checkReg.test(origin)) {
    return new RegExp(origin.substring(1, origin.length - 1));
  }
  return origin;
}