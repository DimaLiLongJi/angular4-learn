'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchMiddleware = function fetchMiddleware(store) {
  return function (next) {
    return function (action) {
      if (!action.url) {
        return next(action);
      }
      if (action.staged) {
        next(_extends({
          stage: 'start'
        }, action));
      }
      var url = action.url,
          _action$params = action.params,
          params = _action$params === undefined ? {} : _action$params,
          method = action.method;

      var fetchUrl = '';
      var fetchParams = {
        credentials: 'include'
      };
      switch (method) {
        case 'GET':
        case 'DELETE':
        default:
          fetchUrl = url + '?' + _qs2.default.stringify(params);
          fetchParams.method = method || 'GET';
          break;
        case 'POST':
        case 'PUT':
          fetchUrl = url;
          fetchParams = _extends({}, fetchParams, {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          });
      }

      fetch(fetchUrl, fetchParams).then(function (response) {
        return response.data ? Promise.resolve(response.data) : response.json();
      }).then(function (result) {
        next({
          type: action.type,
          stage: 'result',
          params: action.params,
          result: result
        });
      }).catch(function (err) {
        next({
          type: action.type,
          stage: 'error',
          params: action.params,
          error: err
        });
      });
    };
  };
};
exports.default = fetchMiddleware;