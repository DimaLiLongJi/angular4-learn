'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Acc = function (_React$Component) {
  _inherits(Acc, _React$Component);

  function Acc() {
    _classCallCheck(this, Acc);

    return _possibleConstructorReturn(this, (Acc.__proto__ || Object.getPrototypeOf(Acc)).apply(this, arguments));
  }

  _createClass(Acc, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // import('../login-modal').then(m => {
      //   this.setState({ LoginModal: m.default });
      // });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // const LoginModal = this.state.LoginModal;
      var user = this.props.user;
      var userExist = user && user.id;
      var imgStyle = {
        backgroundImage: 'url(\'' + (user && user.headImgUrl) + '\')'
      };

      var actions = _react2.default.createElement(
        'dd',
        { className: 'account-popover' },
        _react2.default.createElement(
          'div',
          { className: 'triangle' },
          '\xA0'
        ),
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/account', className: 'btn-wrap' },
          '\u4E2A\u4EBA\u4E2D\u5FC3'
        ),
        _react2.default.createElement(
          'a',
          { onClick: this.context.logout, className: 'btn-wrap' },
          '\u767B\u51FA'
        )
      );

      var userDl = userExist ? _react2.default.createElement(
        'dl',
        { className: 'user', id: 'user', 'ng-if': 'user && user.id' },
        _react2.default.createElement(
          'dt',
          null,
          user.headImgUrl ? _react2.default.createElement('div', { style: imgStyle, alt: '', className: 'portrait' }) : _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-weixiao-' })
          ),
          'Hi, ',
          user.nickname
        ),
        actions
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: 'account-wrap' },
        userDl,
        !userExist && _react2.default.createElement(
          'a',
          { className: 'login-btn', href: 'javascript:;', id: 'login-btn', onClick: function onClick() {
              return _this2.context.openLoginModal();
            } },
          '\u767B\u5F55'
        )
      );
    }
  }]);

  return Acc;
}(_react2.default.Component);

// export default

Acc.contextTypes = {
  openLoginModal: _propTypes2.default.func,
  logout: _propTypes2.default.func
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Acc);