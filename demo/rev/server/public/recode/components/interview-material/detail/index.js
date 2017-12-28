'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _material = require('../../../actions/material');

var Actions = _interopRequireWildcard(_material);

var _reactRouterDom = require('react-router-dom');

var _searchInput = require('../common/search-input');

var _searchInput2 = _interopRequireDefault(_searchInput);

var _searchList = require('./search-list');

var _searchList2 = _interopRequireDefault(_searchList);

var _defaultList = require('./default-list');

var _defaultList2 = _interopRequireDefault(_defaultList);

var _interviewMaterial = require('../../../constants/interview-material');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaterialDetail = function (_Component) {
  _inherits(MaterialDetail, _Component);

  function MaterialDetail(props) {
    _classCallCheck(this, MaterialDetail);

    var _this = _possibleConstructorReturn(this, (MaterialDetail.__proto__ || Object.getPrototypeOf(MaterialDetail)).call(this, props));

    _this.IndustryList = _interviewMaterial.INDUSTRY_LIST;
    _this.industryId = _this.props.match.params.industryId;
    _this.props.updateIndustryId(Number(_this.industryId));
    return _this;
  }

  _createClass(MaterialDetail, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _p = this.props;
      var content = null;
      var banner = null;
      this.currentIndustry = this.IndustryList.filter(function (indu) {
        return Number(indu.id) === Number(_this2.industryId);
      })[0];
      this.bannerStyle = {
        background: 'url("/images/interview-material/industry_banner/' + this.currentIndustry.id + '.jpg") no-repeat center'
      };
      banner = _react2.default.createElement(
        'div',
        { className: 'banner', style: this.bannerStyle },
        _react2.default.createElement(
          'h1',
          null,
          this.currentIndustry.name,
          _react2.default.createElement('span', { className: 'border' })
        )
      );
      if (!_p.params) return null;
      if (!_p.params.industryId) return null;
      if (_p.params.keyword) {
        content = _react2.default.createElement(_searchList2.default, null);
      } else {
        content = _react2.default.createElement(_defaultList2.default, null);
      }
      return _react2.default.createElement(
        'div',
        { className: 'all-material-wrap' },
        _react2.default.createElement(
          'div',
          { className: 'main-content' },
          banner,
          _react2.default.createElement(_searchInput2.default, null),
          _react2.default.createElement(
            'p',
            { className: 'material-location' },
            _react2.default.createElement(
              _reactRouterDom.NavLink,
              { to: '/interview_material', className: 'back-to-all' },
              '\u8D44\u6599\u4E2D\u5FC3   >'
            ),
            '   ',
            _react2.default.createElement(
              'a',
              { className: 'location-detail', href: '#' },
              '\u8D44\u6599\u8BE6\u60C5'
            )
          ),
          content
        )
      );
    }
  }]);

  return MaterialDetail;
}(_react.Component);

MaterialDetail.propTypes = {
  params: _propTypes2.default.object,
  updateIndustryId: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    params: store.interviewMaterial.listSearchParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateIndustryId: function updateIndustryId(industryId) {
      dispatch(Actions.updateIndustryId(industryId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(MaterialDetail);