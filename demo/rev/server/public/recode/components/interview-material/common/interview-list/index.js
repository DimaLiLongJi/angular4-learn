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

var _materialList = require('../material-list');

var _materialList2 = _interopRequireDefault(_materialList);

var _tipList = require('../tip-list');

var _tipList2 = _interopRequireDefault(_tipList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InterviewList = function (_React$Component) {
  _inherits(InterviewList, _React$Component);

  function InterviewList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InterviewList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InterviewList.__proto__ || Object.getPrototypeOf(InterviewList)).call.apply(_ref, [this].concat(args))), _this), _this.pageNumChange = function (pageNum) {
      if (_this.props.pageNumChange) {
        return _this.props.pageNumChange(pageNum);
      } else {
        return null;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InterviewList, [{
    key: 'render',
    value: function render() {
      var _p = this.props;

      var sectionTitle = null;
      if (_p.params.keyword) {
        sectionTitle = _react2.default.createElement(
          'h2',
          { className: 'search-list-title' },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-jinnang-' })
          ),
          '\u9762\u7ECF\u7CBE\u9009\u7CFB\u5217'
        );
      } else {
        sectionTitle = null;
      }
      if (_p.tips && _p.tips.totalItems === 0 && _p.materials && _p.materials.totalItems === 0) return null;
      return _react2.default.createElement(
        'div',
        { className: 'interview-list-wrap' },
        sectionTitle,
        _p.tips && _p.tips.items && _react2.default.createElement(_tipList2.default, { tips: _p.tips }),
        _p.materials && _p.materials.items && _react2.default.createElement(_materialList2.default, { materials: _p.materials, params: _p.listParams ? _p.listParams : _p.params, pageNumChange: this.pageNumChange })
      );
    }
  }]);

  return InterviewList;
}(_react2.default.Component);

InterviewList.propTypes = {
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
  listParams: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number,
    industryId: _propTypes2.default.number
  }),
  pageNumChange: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    materials: store.interviewMaterial.listSearchMaterials,
    tips: store.interviewMaterial.listSearchTips,
    params: store.interviewMaterial.listSearchParams
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps)(InterviewList);