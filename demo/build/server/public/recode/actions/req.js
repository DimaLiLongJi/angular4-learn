'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StagedReq;
function StagedReq(fn, type, staged) {
  var A = function A(_ref) {
    var stage = _ref.stage,
        params = _ref.params,
        result = _ref.result,
        error = _ref.error;
    return {
      stage: stage,
      type: type,
      params: params,
      result: result,
      error: error
    };
  };
  return function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var e = arguments[1];

    if (e) {
      throw new Error('req function only take one param');
    }
    return function (dispatch) {
      if (!staged) dispatch(A({ params: params, stage: 'start' }));
      return fn(params).then(function (response) {
        // console.log('response', response);
        if (response.status !== 200) {
          dispatch(A({
            params: params,
            error: 'Fail to get resource'
          }));
          return Promise.reject(response);
        }
        return response.data || response.json();
      }).then(function (result) {
        return dispatch(A({ params: params, result: result, stage: 'result' }));
      }).catch(function (e) {
        return dispatch(A({
          params: params,
          error: e,
          stage: 'error'
        }));
      });
    };
  };
}