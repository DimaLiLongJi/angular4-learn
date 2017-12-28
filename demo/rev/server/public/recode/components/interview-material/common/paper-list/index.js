'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _material = require('../../../../actions/material');

var Actions = _interopRequireWildcard(_material);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _material2 = require('../material');

var _material3 = _interopRequireDefault(_material2);

var _antd = require('antd');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaperlList = function (_Component) {
  _inherits(PaperlList, _Component);

  function PaperlList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaperlList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaperlList.__proto__ || Object.getPrototypeOf(PaperlList)).call.apply(_ref, [this].concat(args))), _this), _this.listParamChange = function (key) {
      return function (newVal) {
        var _p = _this.props;
        if (_p.params[key] !== newVal || newVal === 1) {
          var _extends2;

          var newParams = _extends({}, _p.params, (_extends2 = {}, _defineProperty(_extends2, key, newVal), _defineProperty(_extends2, 'type', 3), _extends2));
          if (key !== 'pageNum') newParams.pageNum = 1;
          _p.getPapers(newParams);
          if (_p.pageNumChange) {
            _p.pageNumChange(newParams.pageNum);
          }
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaperlList, [{
    key: 'render',
    value: function render() {
      var _p = this.props;

      if (!_p.papers.items || _p.papers.items.length === 0) return null;
      var sectionTitle = null;
      if (_p.params.keyword) {
        sectionTitle = _react2.default.createElement(
          'h2',
          { className: 'search-list-title' },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-jingyan-' })
          ),
          '\u7B14\u8BD5\u771F\u9898\u7CFB\u5217'
        );
      } else {
        sectionTitle = null;
      }
      var lists = _p.papers.items.map(function (paper) {
        return _react2.default.createElement(_material3.default, { material: paper, params: _p.params, key: paper.id });
      });

      var pagination = _p.papers.totalItems / _p.papers.itemsPerPage > 1 && _react2.default.createElement(
        'div',
        { className: 'pagination-wrap' },
        _react2.default.createElement(_antd.Pagination, {
          onChange: this.listParamChange('pageNum'),
          defaultCurrent: 1,
          pageSize: _p.papers.itemsPerPage,
          current: _p.papers.pageNum,
          total: _p.papers.totalItems
        })
      );

      return _react2.default.createElement(
        'div',
        { className: 'paper-list-wrap' },
        sectionTitle,
        _react2.default.createElement(
          'ul',
          { className: 'search-list paper-list' },
          lists,
          pagination
        )
      );
    }
  }]);

  return PaperlList;
}(_react.Component);

PaperlList.propTypes = {
  papers: _propTypes2.default.object,
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number,
    industryId: _propTypes2.default.number
  }),
  pageNumChange: _propTypes2.default.func,
  getPapers: _propTypes2.default.func
};


var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getPapers: function getPapers(params) {
      dispatch(Actions.getPapers(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(PaperlList);