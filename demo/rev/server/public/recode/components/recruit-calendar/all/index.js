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

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _searchCompanyList = require('./searchCompanyList');

var _searchCompanyList2 = _interopRequireDefault(_searchCompanyList);

var _recruitCalendar = require('../../../actions/recruitCalendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import './style.less';


var AllCompany = function (_Component) {
  _inherits(AllCompany, _Component);

  function AllCompany() {
    _classCallCheck(this, AllCompany);

    return _possibleConstructorReturn(this, (AllCompany.__proto__ || Object.getPrototypeOf(AllCompany)).apply(this, arguments));
  }

  _createClass(AllCompany, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !!nextProps.searchKeyword !== !!this.props.searchKeyword;
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('RENDERIUGF');
      var dom = this.props.searchKeyword ? _react2.default.createElement(_searchCompanyList2.default, null) : _react2.default.createElement(_list2.default, null);
      return dom;
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      var listParams = _extends({}, store.getState().recruitCalendar.listParams, params);
      return store.dispatch((0, _recruitCalendar.getCompanyList)(listParams));
    }
  }]);

  return AllCompany;
}(_react.Component);

AllCompany.propTypes = {
  searchKeyword: _propTypes2.default.string
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    searchKeyword: store.recruitCalendar.searchKeyword
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps)(AllCompany);