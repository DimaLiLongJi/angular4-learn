'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplySuccessModal = function (_React$Component) {
  _inherits(ApplySuccessModal, _React$Component);

  function ApplySuccessModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ApplySuccessModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ApplySuccessModal.__proto__ || Object.getPrototypeOf(ApplySuccessModal)).call.apply(_ref, [this].concat(args))), _this), _this.toggleModal = function () {
      _this.props.toggleSuccessModal();
      // this.setState({
      //   visible: !this.state.visible,
      // });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // componentWillReceiveProps(_np) {
  //   const _p = this.props;
  //   if (!_np.oppAvailable && _p.oppAvailable) {
  //     setTimeout(() => {
  //       this.setState({
  //         visible: true,
  //       });
  //     }, 100);
  //   }
  // }

  // state = { visible: false, }

  _createClass(ApplySuccessModal, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Modal,
          { className: 'apply-success-modal',
            title: '\u63D0\u793A\u6D88\u606F',
            wrapClassName: 'vertical-center-modal',
            visible: this.props.visiable,
            onCancel: this.toggleModal,
            footer: null },
          _react2.default.createElement(
            'h3',
            null,
            _react2.default.createElement(
              'svg',
              { className: 'icon', 'aria-hidden': 'true' },
              _react2.default.createElement('use', { xlinkHref: '#icon-gougou-' })
            ),
            '\u6295\u9012\u6210\u529F'
          ),
          _react2.default.createElement('div', { className: 'bg' }),
          _react2.default.createElement(
            'p',
            { className: 'line-one' },
            '\u7B80\u5386\u5DF2\u706B\u901F\u5230\u8FBEHR\u90AE\u7BB1'
          ),
          _react2.default.createElement(
            'p',
            null,
            '\u4F60\u53EF\u524D\u5F80\u4E2A\u4EBA\u4E2D\u5FC3\u67E5\u770B\u6700\u65B0\u6295\u9012\u8FDB\u7A0B\uFF01'
          ),
          _react2.default.createElement(
            'div',
            { className: 'btn-container' },
            _react2.default.createElement(
              'a',
              { href: '/pc/account/application', className: 'success-btn' },
              '\u524D\u5F80\u4E2A\u4EBA\u4E2D\u5FC3'
            ),
            _react2.default.createElement(
              'a',
              { href: 'javascript:;', className: 'success-btn', onClick: this.toggleModal },
              '\u77E5\u9053\u4E86'
            )
          )
        )
      );
    }
  }]);

  return ApplySuccessModal;
}(_react2.default.Component);

exports.default = ApplySuccessModal;