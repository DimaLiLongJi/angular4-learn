'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _discovery = require('../../actions/discovery');

var _industryTag = require('./industryTag');

var _industryTag2 = _interopRequireDefault(_industryTag);

var _industryIntro = require('./industryIntro');

var _industryIntro2 = _interopRequireDefault(_industryIntro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import './style.less';


var Discovery = function (_React$Component) {
  _inherits(Discovery, _React$Component);

  function Discovery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Discovery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Discovery.__proto__ || Object.getPrototypeOf(Discovery)).call.apply(_ref, [this].concat(args))), _this), _this.onTagSelect = function (tag) {
      var _p = _this.props;
      _p.selectIndustry(tag);
      _this.props.history.push('?industryId=' + tag.id);
      _this.getIndustryInfo(tag.id);
    }, _this.getIndustryInfo = function (industryId) {
      var _p = _this.props;
      _p.getIndustryPosition({ industryId: industryId });
      _p.getIndustryIntro({ industryId: industryId });
      _p.getIndustryCompany({ industryId: industryId });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Discovery, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _p = this.props;
      this.getIndustryInfo(_p.selectedIndustry.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var _p = this.props;
      return _react2.default.createElement(
        'div',
        { className: 'discovery-page' },
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            '\u6C42\u804C\u63A2\u7D22_\u6C42\u804C\u5B66\u5802_\u804C\u4E1A\u86D9'
          ),
          _react2.default.createElement('meta', { name: 'description', content: '\u6C42\u804C\u8FF7\u832B\u63A2\u7D22,\u884C\u4E1A\u804C\u4F4D\u767E\u79D1\u62A2\u5148\u770B' }),
          _react2.default.createElement('meta', { name: 'keywords', content: '\u6C42\u804C\u63A2\u7D22,\u6821\u62DB\u63A2\u7D22,\u5E94\u5C4A\u6C42\u804C,\u6C42\u804C\u767E\u79D1,\u804C\u4E1A\u767E\u79D1,\u5C97\u4F4D\u63CF\u8FF0,500\u5F3A\u540D\u4F01' })
        ),
        _react2.default.createElement(
          'section',
          { className: 'main-industry' },
          _react2.default.createElement(
            'h3',
            { className: 'section-title' },
            _react2.default.createElement('span', null),
            '\u884C\u4E1A\u767E\u79D1'
          ),
          _react2.default.createElement(_industryTag2.default, { selectedIndustry: _p.selectedIndustry, onSelect: this.onTagSelect, industryList: _p.industryList })
        ),
        _react2.default.createElement(_industryIntro2.default, { industry: _p.selectedIndustry })
      );
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      var _ref2;

      // console.log('fetch discovery data', params);
      var list = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(store.getState().discovery.industryList));
      return Promise.all([_discovery.getIndustryIntro, _discovery.getIndustryPosition, _discovery.getIndustryCompanyList].map(function (fn) {
        return store.dispatch(fn({ industryId: params.industryId || list[0].id }));
      }));
    }
  }]);

  return Discovery;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    industryList: state.discovery.industryList,
    selectedIndustry: state.discovery.selectedIndustry
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getIndustryIntro: function getIndustryIntro(params) {
      dispatch((0, _discovery.getIndustryIntro)(params));
    },
    getIndustryPosition: function getIndustryPosition(params) {
      dispatch((0, _discovery.getIndustryPosition)(params));
    },
    getIndustryCompany: function getIndustryCompany(params) {
      dispatch((0, _discovery.getIndustryCompanyList)(params));
    },
    selectIndustry: function selectIndustry(params) {
      dispatch((0, _discovery.selectIndustry)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Discovery);