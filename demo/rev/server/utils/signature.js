'use strict';

const sha1 = require('sha1');

module.exports = {
  sign,
  validate
};

function sign(params) {
  for (let k in params) {
    if (typeof params[k] === 'number') params[k] += '';
  }
  return sha1(JSON.stringify(params) + 'careerfrog');
}

function validate(sign, params) {
  return sha1(JSON.stringify(params) + 'careerfrog') === sign;
}