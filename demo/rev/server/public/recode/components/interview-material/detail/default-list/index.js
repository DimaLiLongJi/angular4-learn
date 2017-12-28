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

var Actions = _interopRequireWildcard(_material);

var _preServiceList = require('../../common/pre-service-list');

var _preServiceList2 = _interopRequireDefault(_preServiceList);

var _paperInterviewList = require('../../common/paper-interview-list');

var _paperInterviewList2 = _interopRequireDefault(_paperInterviewList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultList = function (_Component) {
  _inherits(DefaultList, _Component);

  function DefaultList(props) {
    _classCallCheck(this, DefaultList);

    var _this = _possibleConstructorReturn(this, (DefaultList.__proto__ || Object.getPrototypeOf(DefaultList)).call(this, props));

    _this.props.getAllMaterials(_this.props.params);
    return _this;
  }

  _createClass(DefaultList, [{
    key: 'render',
    value: function render() {
      var _p = this.props;

      return _react2.default.createElement(
        'div',
        { className: 'material-default-list-wrap' },
        _react2.default.createElement(_preServiceList2.default, null),
        _react2.default.createElement(_paperInterviewList2.default, null)
      );
    }
  }]);

  return DefaultList;
}(_react.Component);

DefaultList.propTypes = {
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
    params: store.interviewMaterial.listSearchParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getAllMaterials: function getAllMaterials(params) {
      dispatch(Actions.getAllMaterials(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(DefaultList);