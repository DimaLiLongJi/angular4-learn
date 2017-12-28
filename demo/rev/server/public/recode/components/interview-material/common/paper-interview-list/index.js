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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _material = require('../../../../actions/material');

var Actions = _interopRequireWildcard(_material);

var _paperList = require('../paper-list');

var _paperList2 = _interopRequireDefault(_paperList);

var _interviewList = require('../interview-list');

var _interviewList2 = _interopRequireDefault(_interviewList);

var _antd = require('antd');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaperInterviewList = function (_Component) {
  _inherits(PaperInterviewList, _Component);

  function PaperInterviewList(props) {
    _classCallCheck(this, PaperInterviewList);

    var _this = _possibleConstructorReturn(this, (PaperInterviewList.__proto__ || Object.getPrototypeOf(PaperInterviewList)).call(this, props));

    _this.pageNumChange = function (pageNum) {
      if (_this.state.active === 'paper') {
        var params = _extends({}, _this.state.paperParams);
        params.pageNum = pageNum;
        _this.setState({
          paperParams: _extends({}, params)
        });
      } else if (_this.state.active === 'interview') {
        var _params = _extends({}, _this.state.interviewParams);
        _params.pageNum = pageNum;
        _this.setState({
          interviewParams: _extends({}, _params)
        });
      }
    };

    _this.state = {
      active: 'paper',
      paperParams: _extends({}, _this.props.params),
      interviewParams: _extends({}, _this.props.params)
    };
    return _this;
  }

  _createClass(PaperInterviewList, [{
    key: 'changeSelected',
    value: function changeSelected(type) {
      if (type === 'paper') {
        this.setState({
          active: 'paper'
        });
        this.props.getPapers(this.state.paperParams);
      } else if (type === 'interview') {
        this.setState({
          active: 'interview'
        });
        this.props.getMaterials(this.state.interviewParams);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _p = this.props;
      if (!_p.materials.items || _p.materials.items.length === 0 || !_p.tips.items || _p.tips.items.length === 0) return null;
      var content = null;

      if (this.state.active === 'paper') {
        content = _react2.default.createElement(_paperList2.default, { papers: _p.papers, params: this.state.paperParams, pageNumChange: this.pageNumChange });
      } else if (this.state.active === 'interview') {
        content = _react2.default.createElement(_interviewList2.default, { listParams: this.state.paperParams, pageNumChange: this.pageNumChange });
      }

      return _react2.default.createElement(
        'div',
        { className: 'paper-tip-list-wrap' },
        _react2.default.createElement(
          'div',
          { className: 'paper-tip-tab' },
          _react2.default.createElement(
            'span',
            { onClick: function onClick() {
                return _this2.changeSelected('paper');
              }, className: this.state.active === 'paper' ? 'paper-tab active' : 'paper-tab' },
            '\u7B14\u8BD5\u771F\u9898\u7CFB\u5217'
          ),
          _react2.default.createElement(
            'span',
            { onClick: function onClick() {
                return _this2.changeSelected('interview');
              }, className: this.state.active === 'interview' ? 'interview-tab active' : 'interview-tab' },
            '\u9762\u8BD5\u7CBE\u9009\u7CFB\u5217'
          )
        ),
        content
      );
    }
  }]);

  return PaperInterviewList;
}(_react.Component);

PaperInterviewList.propTypes = {
  materials: _propTypes2.default.object,
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number
  }),
  tips: _propTypes2.default.object,
  industryId: _propTypes2.default.number,
  // getAllMaterials: _t.func,
  getPapers: _propTypes2.default.func,
  getMaterials: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    materials: store.interviewMaterial.listSearchMaterials,
    tips: store.interviewMaterial.listSearchTips,
    papers: store.interviewMaterial.listSearchPapers,
    params: store.interviewMaterial.listSearchParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // getAllMaterials: (params) => {
    //   dispatch(Actions.getAllMaterials(params));
    // },
    getPapers: function getPapers(params) {
      dispatch(Actions.getPapers(params));
    },
    getMaterials: function getMaterials(params) {
      dispatch(Actions.getMaterials(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(PaperInterviewList);