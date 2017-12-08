const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function templateCacheLoader(source) {
  const options = loaderUtils.getOptions(this);
  const app = `angular.module('${options.app || 'app'}')`;
  const templates = {};
  const reads = [];

  const callback = this.async();

  let result = source.replace(/templateUrl:[ ]*['"].+\.html['"]/g, (str) => {
    const url = str.match(/['"](.+\.html)/)[1];
    const htmlPath = path.join(__dirname, '../../public', url);
    // console.log('htmlPathhtmlPath', htmlPath);
    this.addDependency(htmlPath);
    reads.push(new Promise((res, rej) => {
      fs.readFile(htmlPath, 'utf-8', (err, html) => {
        if (err) return res();
        const key = url.replace(/\//g, '.');
        // console.log('url', url);
        // console.log('keykeykeykey', key);
        templates[key] = {
          url,
          html
        };
        res(html);
      });
    }));
    return str;
  });
  Promise.all(reads)
    .then(() => {
      Object.keys(templates).forEach(k => {
        result = result.replace(new RegExp(templates[k].url, "g"), k);
      });
      if (Object.keys(templates).length) {
        result += `(() => {
          ${app}.run(['$templateCache', function($templateCache) {
            ${Object.keys(templates).map(k => addCache(app, k, templates[k].html)).join('')}
          }]);
          })()`;
      }
      // console.log(result);
      callback(null, result);
    })
    .catch(err => callback(err));
};

function addCache(app, key, val) {
  return `$templateCache.put('${key}', \`${val}\`);`;
}
