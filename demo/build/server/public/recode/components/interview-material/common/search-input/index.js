'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _material = require('../../../../actions/material');

var Actions = _interopRequireWildcard(_material);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInput = function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchInput.__proto__ || Object.getPrototypeOf(SearchInput)).call.apply(_ref, [this].concat(args))), _this), _this.search = function (type, value) {
      var _p = _this.props;
      if (type) {
        _p.params.pageNum = 1;
        _p.params.keyword = value;
      }
      var params = Object.assign({}, _p.params);
      _p.updateKeyword(_p.params.keyword);
      _p.getAllMaterials(_p.params);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.style = {
        margin: '40px auto'
      };

      return _react2.default.createElement(
        'div',
        { className: 'interview-material-search-container', style: this.style },
        _react2.default.createElement(
          'svg',
          { className: 'icon', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-sousuo' })
        ),
        _react2.default.createElement('input', { value: this.props.params.keyword, onChange: function onChange(event) {
            return _this2.search('research', event.target.value);
          }, type: 'text', placeholder: '\u8BF7\u8F93\u5165\u516C\u53F8' }),
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: 'search-btn' },
          '\u641C\u7D22'
        )
      );
    }
  }]);

  return SearchInput;
}(_react2.default.Component);

SearchInput.propTypes = {
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number,
    industryId: _propTypes2.default.number
  }),
  updateKeyword: _propTypes2.default.func,
  getAllMaterials: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(store) {
  return {
    params: store.interviewMaterial.listSearchParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateKeyword: function updateKeyword(params) {
      dispatch(Actions.updateKeyword(params));
    },
    getAllMaterials: function getAllMaterials(params) {
      dispatch(Actions.getAllMaterials(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchInput);