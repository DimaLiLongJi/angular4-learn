'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  visible: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  closeModal: _propTypes2.default.func
};

var SubscribeSuccessModal = function SubscribeSuccessModal(_ref) {
  var visible = _ref.visible,
      title = _ref.title,
      closeModal = _ref.closeModal;
  return _react2.default.createElement(
    _antd.Modal,
    { title: false,
      footer: false,
      visible: visible,
      onCancel: closeModal,
      bodyStyle: { padding: 0, borderRadius: '6px', overflow: 'hidden' } },
    _react2.default.createElement(
      'div',
      { className: 'subscription-modal' },
      _react2.default.createElement(
        'h1',
        null,
        title || '扫码关注公众号'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          _react2.default.createElement(
            'svg',
            { className: 'icon close-btn', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-gougou-' })
          ),
          '\u8BA2\u9605\u6210\u529F'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u8BE5\u516C\u53F8\u7F51\u7533\u65F6\u95F4\u5C06\u5728\u670D\u52A1\u53F7\u901A\u77E5\u4F60\uFF01'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u540C\u65F6\uFF0C\u6211\u4EEC\u4E3A\u4F60\u8BA2\u9605\u4E86\u540C\u884C\u4E1A\u7684\u6240\u6709\u516C\u53F8\u3002'
        ),
        _react2.default.createElement(
          'p',
          { className: 'cancel-subscription' },
          '\u82E5\u4F60\u60F3\u4FEE\u6539\u8BA2\u9605\u5185\u5BB9\uFF0C\u8BF7\u5728\u670D\u52A1\u53F7\u64CD\u4F5C\u3002'
        )
      )
    )
  );
};

SubscribeSuccessModal.propTypes = propTypes;

exports.default = SubscribeSuccessModal;