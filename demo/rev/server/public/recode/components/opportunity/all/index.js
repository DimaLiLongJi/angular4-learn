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

var _commonOpportunity = require('../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _allOpportunity = require('../../../actions/allOpportunity');

var AllOppActions = _interopRequireWildcard(_allOpportunity);

var _OppList2 = require('../common/OppList');

var _OppList3 = _interopRequireDefault(_OppList2);

var _Plcaeholder = require('../common/Plcaeholder');

var _Plcaeholder2 = _interopRequireDefault(_Plcaeholder);

var _IndustrySelector = require('./IndustrySelector');

var _IndustrySelector2 = _interopRequireDefault(_IndustrySelector);

var _idnex = require('./LocationSelector/idnex');

var _idnex2 = _interopRequireDefault(_idnex);

var _utils = require('../../../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions

// components


var AllOpp = function (_Component) {
  _inherits(AllOpp, _Component);

  function AllOpp(props) {
    _classCallCheck(this, AllOpp);

    var _this = _possibleConstructorReturn(this, (AllOpp.__proto__ || Object.getPrototypeOf(AllOpp)).call(this, props));

    _this.initData = function () {
      // 1 props: oppList industryTag locationTag oppLocationTag
      // 2 if params dosent exist, reget it.
      var _p = _this.props;
      if (!_p.opps.length && !_p.keyword) _p.getAllOppList(_p.listParams);
      if (_p.keyword) _this.keywordChange(_p.keyword);
      if (!_p.industryTag.length) _p.getIndustryTag();
      if (!_p.locationTag.length) _p.getLocationTag();
      if (!_p.oppLocationTag.length) _p.getOppLocationTag();
    };

    _this.listParamChange = function (key) {
      return (0, _utils.debounce)(function (newVal) {
        var _p = _this.props;
        if (_p.listParams[key] !== newVal) {
          var newParams = _extends({}, _p.listParams, _defineProperty({}, key, newVal));
          if (key !== 'pageNum') newParams.pageNum = 1;
          _p.getAllOppList(newParams);
        }
      }, 300);
    };

    _this.keywordChange = _this.listParamChange('keyword');
    return _this;
  }

  _createClass(AllOpp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initData();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_np) {
      var _p = this.props;
      if (_np.keyword !== _p.keyword) {
        this.keywordChange(_np.keyword);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _p = this.props;
      var paginationInfo = {
        pageNum: _p.listParams.pageNum,
        totalItems: _p.totalItems,
        itemsPerPage: _p.listParams.itemsPerPage
      };
      var showCount = _p.listParams.industryId || _p.listParams.locationId || _p.keyword;
      var _Selector = Boolean(_p.locationTag.length) && Boolean(_p.oppLocationTag.length) && Boolean(_p.industryTag.length) && _react2.default.createElement(
        'div',
        { className: 'tool-bar' },
        _react2.default.createElement(_idnex2.default, {
          locationTag: _p.locationTag,
          defaultLocationId: _p.listParams.locationId,
          hotLocationTag: _p.oppLocationTag,
          changeParams: this.listParamChange('locationId') }),
        _react2.default.createElement(_IndustrySelector2.default, { industryTag: _p.industryTag,
          defaultIndustryId: _p.listParams.industryId,
          changeParams: this.listParamChange('industryId') })
      );
      var _OppList = _p.opps.length ? _react2.default.createElement(_OppList3.default, { opps: _p.opps, paginationInfo: paginationInfo,
        showCount: showCount,
        changePage: this.listParamChange('pageNum') }) : _react2.default.createElement(_Plcaeholder2.default, null);
      return _react2.default.createElement(
        'div',
        { className: 'main-opp-list' },
        _Selector,
        _OppList
      );
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      console.log('params', params);
      var listParams = _extends({}, store.getState().allOpp.listParams, params);
      return store.dispatch(AllOppActions.getAllOppList(listParams));
    }
  }]);

  return AllOpp;
}(_react.Component);

AllOpp.propTypes = {
  opps: _propTypes2.default.array,
  industryTag: _propTypes2.default.array,
  locationTag: _propTypes2.default.array,
  oppLocationTag: _propTypes2.default.array,
  getAllOppList: _propTypes2.default.func,
  getLocationTag: _propTypes2.default.func,
  getIndustryTag: _propTypes2.default.func,
  getOppLocationTag: _propTypes2.default.func,
  listParams: _propTypes2.default.shape({
    industryId: _propTypes2.default.number,
    locationId: _propTypes2.default.number,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number
  })
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    listParams: state.allOpp.listParams,
    totalItems: state.allOpp.totalItems,
    opps: state.allOpp.opps,
    locationTag: state.allOpp.locationTag,
    oppLocationTag: state.allOpp.oppLocationTag,
    industryTag: state.commonOpp.industryTag,
    keyword: state.commonOpp.keyword
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getIndustryTag: function getIndustryTag(params) {
      dispatch(CommonOppActions.getIndustryTag(params));
    },
    updateKeyword: function updateKeyword(params) {
      dispatch(CommonOppActions.updateKeyword(params));
    },
    getAllOppList: function getAllOppList(params) {
      dispatch(AllOppActions.getAllOppList(params));
    },
    getLocationTag: function getLocationTag() {
      dispatch(AllOppActions.getLocationTag());
    },
    getOppLocationTag: function getOppLocationTag() {
      dispatch(AllOppActions.getOppLocationTag());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AllOpp);