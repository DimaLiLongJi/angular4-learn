// const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function templateCacheLoader(source) {
  // const options = loaderUtils.getOptions(this);
  // const app = `angular.module('${options.app || 'app'}')`;
  // const templates = {};

  const callback = this.async();

  const result = source.replace(/controllerUrl:[ ]*['"](.+?)['"]/g, (str, url) => `resolve : {
              load: ['$ocLazyLoad', $ocLazyLoad =>
                import( '${url}').then(m => $ocLazyLoad.load(m.default))
              ]
            }`);

  callback(null, result);
};
