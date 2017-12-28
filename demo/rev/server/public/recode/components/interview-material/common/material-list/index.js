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

var MaterialList = function (_React$Component) {
  _inherits(MaterialList, _React$Component);

  function MaterialList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MaterialList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MaterialList.__proto__ || Object.getPrototypeOf(MaterialList)).call.apply(_ref, [this].concat(args))), _this), _this.listParamChange = function (key) {
      return function (newVal) {
        var _p = _this.props;
        if (_p.params[key] !== newVal || newVal === 1) {
          var _extends2;

          var newParams = _extends({}, _p.params, (_extends2 = {}, _defineProperty(_extends2, key, newVal), _defineProperty(_extends2, 'type', 0), _extends2));
          if (key !== 'pageNum') newParams.pageNum = 1;
          _p.getMaterials(newParams);
          if (_p.pageNumChange) _p.pageNumChange(newParams.pageNum);
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MaterialList, [{
    key: 'render',
    value: function render() {
      var _p = this.props;
      if (!_p.materials.items || _p.materials.items.length === 0) return null;
      var lists = _p.materials.items.map(function (material) {
        return _react2.default.createElement(_material3.default, { material: material, params: _p.params, key: material.id });
      });

      var pagination = _p.materials.totalItems / _p.materials.itemsPerPage > 1 && _react2.default.createElement(
        'div',
        { className: 'pagination-wrap' },
        _react2.default.createElement(_antd.Pagination, {
          onChange: this.listParamChange('pageNum'),
          defaultCurrent: 1,
          pageSize: _p.materials.itemsPerPage,
          current: _p.materials.pageNum,
          total: _p.materials.totalItems
        })
      );

      return _react2.default.createElement(
        'div',
        { className: 'material-list-wrap' },
        _react2.default.createElement(
          'div',
          { className: 'section-title' },
          '\u9762\u8BD5\u7ECF\u9A8C'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'search-list material-list' },
          lists,
          pagination
        )
      );
    }
  }]);

  return MaterialList;
}(_react2.default.Component);

MaterialList.propTypes = {
  materials: _propTypes2.default.object,
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number
  }),
  getMaterials: _propTypes2.default.func
};


var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getMaterials: function getMaterials(params) {
      dispatch(Actions.getMaterials(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(MaterialList);