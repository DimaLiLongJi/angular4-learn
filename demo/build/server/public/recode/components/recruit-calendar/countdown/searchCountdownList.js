'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _searchList = require('../common/searchList');

var _searchList2 = _interopRequireDefault(_searchList);

var _recruitCalendar = require('../../../actions/recruitCalendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    companyList: store.recruitCalendar.countdownSearchList,
    keyword: store.recruitCalendar.searchKeyword,
    params: store.recruitCalendar.countdownSearchParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getCompanyList: function getCompanyList(params) {
      dispatch((0, _recruitCalendar.getCountdownList)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(_searchList2.default);