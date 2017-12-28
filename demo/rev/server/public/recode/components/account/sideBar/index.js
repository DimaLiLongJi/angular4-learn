'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _user = require('../../../actions/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideBar = function (_Component) {
  _inherits(SideBar, _Component);

  function SideBar(props) {
    _classCallCheck(this, SideBar);

    var _this = _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this, props));

    _this.select = function (idx) {
      _this.setState({ selected: idx });
      console.log('idx', idx);
      if (idx === 1 && _this.props.applicationCheckedNotice) {
        _this.props.userCheck('application');
      }
      if (idx === 3 && !_this.props.answerChecked) {
        _this.props.userCheck('answer');
      }
    };

    _this.state = {
      selected: _this.props.selected
    };
    return _this;
  }

  _createClass(SideBar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('this.props.answerChecked', this.props.answerChecked);

      var lis = this.props.list.map(function (l, idx) {
        return _react2.default.createElement(
          'li',
          { key: idx, className: idx === _this2.state.selected ? 'active' : '', onClick: _this2.select.bind(_this2, idx) },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            { key: idx, activeClassName: 'active', to: l.to },
            _react2.default.createElement(
              'svg',
              { className: 'icon', 'aria-hidden': 'true' },
              _react2.default.createElement('use', { xlinkHref: l.icon })
            ),
            l.text,
            idx === 1 && _this2.props.applicationCheckedNotice ? _react2.default.createElement('span', { className: 'redCircle' }) : '',
            idx === 3 && !_this2.props.answerChecked ? _react2.default.createElement('span', { className: 'redCircle' }) : ''
          )
        );
      });
      return _react2.default.createElement(
        'aside',
        { className: 'left-side-bar' },
        _react2.default.createElement(
          'ul',
          null,
          lis
        )
      );
    }
  }]);

  return SideBar;
}(_react.Component);

SideBar.propTypes = {
  list: _propTypes2.default.array.isRequired
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    userId: store.user.id,
    answerChecked: store.user.answerChecked,
    applicationCheckedNotice: store.user.applicationCheckedNotice,
    user: store.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    userCheck: function userCheck(params) {
      dispatch((0, _user.userCheck)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(SideBar);