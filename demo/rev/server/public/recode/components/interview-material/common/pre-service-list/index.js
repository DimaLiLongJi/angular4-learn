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

var _preService = require('../pre-service');

var _preService2 = _interopRequireDefault(_preService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreServiceList = function (_Component) {
  _inherits(PreServiceList, _Component);

  function PreServiceList() {
    _classCallCheck(this, PreServiceList);

    return _possibleConstructorReturn(this, (PreServiceList.__proto__ || Object.getPrototypeOf(PreServiceList)).apply(this, arguments));
  }

  _createClass(PreServiceList, [{
    key: 'render',
    value: function render() {
      var _p = this.props;
      if (!_p.preServices || !_p.preServices.items || _p.preServices.items.length === 0) return null;
      var lists = _p.preServices.items.map(function (preService) {
        return _react2.default.createElement(_preService2.default, { preService: preService, key: preService.id });
      });

      return _react2.default.createElement(
        'div',
        { className: 'preService-list-wrap' },
        _react2.default.createElement(
          'h2',
          { className: 'search-list-title' },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-bidu-' })
          ),
          '\u804C\u524D\u5FC5\u8BFB\u7CFB\u5217'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'search-list preService-list' },
          lists
        )
      );
    }
  }]);

  return PreServiceList;
}(_react.Component);

PreServiceList.propTypes = {
  preServices: _propTypes2.default.object
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    preServices: store.interviewMaterial.listSearchPreServices
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps)(PreServiceList);