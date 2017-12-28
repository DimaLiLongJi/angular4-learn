'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recruitCalendar = require('../../../actions/recruitCalendar');

var _countdownList = require('./countdownList');

var _countdownList2 = _interopRequireDefault(_countdownList);

var _industrySelector = require('../common/industrySelector');

var _industrySelector2 = _interopRequireDefault(_industrySelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import './style.less';


var Countdown = function (_Component) {
  _inherits(Countdown, _Component);

  function Countdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Countdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call.apply(_ref, [this].concat(args))), _this), _this.paramChange = function (key) {
      return function (newVal) {
        var _p = _this.props;
        if (_p.params[key] !== newVal) {
          var newParams = _extends({}, _p.params, _defineProperty({}, key, newVal));
          if (key !== 'pageNum') newParams.pageNum = 1;
          _p.getCountdownList(newParams);
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Countdown, [{
    key: 'render',
    value: function render() {
      var _p = this.props;
      return _react2.default.createElement(
        'div',
        { className: 'main-content' },
        _react2.default.createElement(
          'div',
          { className: 'tool-side-bar' },
          _p.industries && _react2.default.createElement(_industrySelector2.default, { industries: _p.industries, onSelect: this.paramChange('industryId'), selected: _p.params.industryId })
        ),
        _react2.default.createElement(_countdownList2.default, null)
      );
    }
  }]);

  return Countdown;
}(_react.Component);

Countdown.propTypes = {
  industries: _propTypes2.default.array
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    industries: store.recruitCalendar.industries,
    params: store.recruitCalendar.countdownParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getCountdownList: function getCountdownList(params) {
      dispatch((0, _recruitCalendar.getCountdownList)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Countdown);