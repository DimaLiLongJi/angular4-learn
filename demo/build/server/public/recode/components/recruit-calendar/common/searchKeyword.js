'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _recruitCalendar = require('../../../actions/recruitCalendar');

var _searchInput = require('../../common/search-input');

var _searchInput2 = _interopRequireDefault(_searchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    keyword: store.recruitCalendar.searchKeyword
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleChange: function handleChange(params) {
      dispatch((0, _recruitCalendar.updateKeyword)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(_searchInput2.default);