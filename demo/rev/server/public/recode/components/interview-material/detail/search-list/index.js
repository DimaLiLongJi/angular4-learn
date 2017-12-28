'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _material = require('../../../../actions/material');

var _materialList = require('../../common/material-list');

var _materialList2 = _interopRequireDefault(_materialList);

var _tipList = require('../../common/tip-list');

var _tipList2 = _interopRequireDefault(_tipList);

var _preServiceList = require('../../common/pre-service-list');

var _preServiceList2 = _interopRequireDefault(_preServiceList);

var _paperList = require('../../common/paper-list');

var _paperList2 = _interopRequireDefault(_paperList);

var _interviewList = require('../../common/interview-list');

var _interviewList2 = _interopRequireDefault(_interviewList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchList = function (_React$Component) {
  _inherits(SearchList, _React$Component);

  function SearchList() {
    _classCallCheck(this, SearchList);

    return _possibleConstructorReturn(this, (SearchList.__proto__ || Object.getPrototypeOf(SearchList)).apply(this, arguments));
  }

  _createClass(SearchList, [{
    key: 'render',
    value: function render() {
      var _p = this.props;
      var noContent = null;
      if ((!_p.tips || !_p.tips.totalItems) && (!_p.materials || !_p.materials.totalItems) && (!_p.papers || !_p.papers.totalItems) && (!_p.preServices || !_p.preServices.totalItems)) {
        noContent = _react2.default.createElement('img', { src: 'http://static.careerfrog.com.cn/cf-college/images/nothing.f42fc80a.png', alt: '\u6682\u65E0\u641C\u7D22\u7ED3\u679C', className: 'placeholder' });
      }
      return _react2.default.createElement(
        'div',
        { className: 'interview-material-search-list-wrap' },
        noContent,
        _p.preServices && _p.preServices.totalItems != 0 && _react2.default.createElement(_preServiceList2.default, null),
        _p.papers && _p.papers.totalItems != 0 && _react2.default.createElement(_paperList2.default, { papers: _p.papers, params: _p.params }),
        _p.tips && _p.materials && _react2.default.createElement(_interviewList2.default, null)
      );
    }
  }]);

  return SearchList;
}(_react2.default.Component);

SearchList.propTypes = {
  materials: _propTypes2.default.shape({
    itemsPerPage: _propTypes2.default.number,
    totalItems: _propTypes2.default.number,
    pageNum: _propTypes2.default.number,
    items: _propTypes2.default.array
  }),
  tips: _propTypes2.default.shape({
    itemsPerPage: _propTypes2.default.number,
    totalItems: _propTypes2.default.number,
    pageNum: _propTypes2.default.number,
    items: _propTypes2.default.array
  }),
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number,
    industryId: _propTypes2.default.number
  }),
  getAllMaterials: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    materials: store.interviewMaterial.listSearchMaterials,
    tips: store.interviewMaterial.listSearchTips,
    papers: store.interviewMaterial.listSearchPapers,
    preServices: store.interviewMaterial.listSearchPreServices,
    params: store.interviewMaterial.listSearchParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getAllMaterials: function getAllMaterials(params) {
      dispatch((0, _material.getAllMaterials)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(SearchList);