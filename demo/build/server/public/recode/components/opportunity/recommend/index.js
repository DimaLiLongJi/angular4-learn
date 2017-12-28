'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _commonOpportunity = require('../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _recommendOpportunity = require('../../../actions/recommendOpportunity');

var RecommendOppActions = _interopRequireWildcard(_recommendOpportunity);

var _OppList2 = require('../common/OppList');

var _OppList3 = _interopRequireDefault(_OppList2);

var _Plcaeholder = require('../common/Plcaeholder');

var _Plcaeholder2 = _interopRequireDefault(_Plcaeholder);

var _Preference = require('./Preference');

var _Preference2 = _interopRequireDefault(_Preference);

var _utils = require('../../../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions

// components


var RecommendOpp = function (_Component) {
  _inherits(RecommendOpp, _Component);

  function RecommendOpp(props) {
    _classCallCheck(this, RecommendOpp);

    var _this = _possibleConstructorReturn(this, (RecommendOpp.__proto__ || Object.getPrototypeOf(RecommendOpp)).call(this, props));

    _this.initData = function () {
      var _p = _this.props;
      if (_p.user.id && _p.customizeStatus === 'customized') {
        _this.keywordChange(_p.keyword);
      }
    };

    _this.listParamChange = function (key) {
      return (0, _utils.debounce)(function (newVal) {
        var _p = _this.props;
        if (_p.listParams[key] !== newVal) {
          var newParams = _extends({}, _p.listParams, _defineProperty({}, key, newVal));
          if (key !== 'pageNum') newParams.pageNum = 1;
          _p.getRecommendOppList(newParams);
        }
      }, 300);
    };

    _this.state = {
      customizeStatus: 'uncustomize'
    };
    _this.keywordChange = _this.listParamChange('keyword');
    return _this;
  }

  _createClass(RecommendOpp, [{
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
      if (!_p.opps.length && _p.user && _np.customizeStatus !== _p.customizeStatus) {
        _p.getRecommendOppList(_p.listParams);
      }
      if (_np.customizeStatus === 'customized' && _p.customizeStatus !== _np.customizeStatus) {
        _p.getRecommendOppList(_p.listParams);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _p = this.props;
      if (!_p.opps) return null;
      var paginationInfo = {
        pageNum: _p.listParams.pageNum,
        totalItems: _p.totalItems,
        itemsPerPage: _p.listParams.itemsPerPage
      };
      var showCount = _p.keyword;
      var _OppList = Boolean(_p.customizeStatus === 'customized') && Boolean(_p.opps.length) && _react2.default.createElement(_OppList3.default, { opps: _p.opps, paginationInfo: paginationInfo,
        showCount: showCount,
        changePage: this.listParamChange('pageNum') });
      var _Placeholder = _p.customizeStatus === 'customized' && _react2.default.createElement(_Plcaeholder2.default, null);
      return _react2.default.createElement(
        'div',
        { className: 'main-opp-list' },
        global.window && _react2.default.createElement(_Preference2.default, null),
        _OppList || _Placeholder
      );
    }
  }]);

  return RecommendOpp;
}(_react.Component);

RecommendOpp.propTypes = {};


var mapStateToProps = function mapStateToProps(state) {
  return {
    listParams: state.recommendOpp.listParams,
    totalItems: state.recommendOpp.totalItems,
    opps: state.recommendOpp.opps,
    keyword: state.commonOpp.keyword,
    customizeStatus: state.commonOpp.customizeStatus,
    user: state.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateKeyword: function updateKeyword(params) {
      dispatch(CommonOppActions.updateKeyword(params));
    },
    getRecommendOppList: function getRecommendOppList(params) {
      dispatch(RecommendOppActions.getRecommendOppList(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecommendOpp);