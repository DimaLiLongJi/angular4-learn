'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadConfig = loadConfig;
var CONFIG_LOAD = exports.CONFIG_LOAD = 'CONFIG_LOAD';

function loadConfig(config) {
  return { type: CONFIG_LOAD, config: config };
}