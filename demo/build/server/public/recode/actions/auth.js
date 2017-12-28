'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openLoginModal = exports.closeLoginModal = exports.getTempQrCodeTicket = exports.OPEN_LOGIN_MODAL = exports.CLOSE_LOGIN_MODAL = exports.GET_TEMP_QRCODE_TICKET = undefined;

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_TEMP_QRCODE_TICKET = exports.GET_TEMP_QRCODE_TICKET = 'GET_TEMP_QRCODE_TICKET';

var CLOSE_LOGIN_MODAL = exports.CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
var OPEN_LOGIN_MODAL = exports.OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';

function _getTempQrCodeTicket(params) {
  return fetch('/api/wechat/temp_qrcode', {
    credentials: 'include'
  });
}
var getTempQrCodeTicket = exports.getTempQrCodeTicket = (0, _req2.default)(_getTempQrCodeTicket, GET_TEMP_QRCODE_TICKET, 1);

var closeLoginModal = exports.closeLoginModal = function closeLoginModal(params) {
  return {
    type: CLOSE_LOGIN_MODAL
  };
};

var openLoginModal = exports.openLoginModal = function openLoginModal(params) {
  return function (dispatch, getState) {
    var tempQrCode = getState().auth.tempQrcodeTicket;
    if (params && params.qrcodeType === 1 && !tempQrCode) {
      dispatch(getTempQrCodeTicket());
    }
    dispatch({
      type: OPEN_LOGIN_MODAL,
      config: params || {}
    });
  };
};