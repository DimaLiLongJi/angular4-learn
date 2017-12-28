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

var _utils = require('../../../../utils');

var _antd = require('antd');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Material = function (_React$Component) {
  _inherits(Material, _React$Component);

  function Material() {
    _classCallCheck(this, Material);

    return _possibleConstructorReturn(this, (Material.__proto__ || Object.getPrototypeOf(Material)).apply(this, arguments));
  }

  _createClass(Material, [{
    key: 'gotoPreview',
    value: function gotoPreview(material) {
      if (!material) return;
      this.props.countViewMaterial(material.id);
      var pathUrl = '/materials/' + material.fileId + '/preview?fileName=' + encodeURIComponent(material.fileName) + '&hd=1';
      window.open(pathUrl, '_blank');
    }
  }, {
    key: 'download',
    value: function download(material, event) {
      if (!this.props.userId) {
        event.stopPropagation();
        this.context.openLoginModal();
        return;
      }
      material.download = this.context.config.CF_FILE_BASE_URL + '/' + material.fileId + '?originalName=' + encodeURIComponent(material.fileName) + '&download=1';
      window.location.href = material.download;
      this.props.countDownloadMaterial(material.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _p = this.props;
      return _react2.default.createElement(
        'li',
        { className: 'material-detail' },
        _react2.default.createElement(
          'span',
          { className: 'name' },
          _react2.default.createElement(
            'strong',
            { onClick: function onClick() {
                return _this2.gotoPreview(_p.material);
              } },
            _p.material.fileName
          ),
          _react2.default.createElement(
            'span',
            { className: _p.material.isHotCompany ? "hot-company" : "not-hot-company" },
            'HOT'
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'update' },
          '\u66F4\u65B0\u4E8E ',
          (0, _utils.fd)(_p.material.updatedAt)
        ),
        _react2.default.createElement(
          'span',
          { className: 'action', onClick: function onClick() {
              return _this2.gotoPreview(_p.material);
            } },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-yulan-' })
          ),
          '\u9884\u89C8'
        ),
        _react2.default.createElement(
          'i',
          { className: 'line' },
          '|'
        ),
        _react2.default.createElement('a', { className: 'action', href: _p.material.download, onClick: function onClick(event) {
            return _this2.download(_p.material, event);
          } }),
        _react2.default.createElement(
          'a',
          { className: 'action', onClick: function onClick(event) {
              return _this2.download(_p.material, event);
            } },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-xiazai-' })
          ),
          '\u4E0B\u8F7D'
        )
      );
    }
  }]);

  return Material;
}(_react2.default.Component);

Material.propTypes = {
  material: _propTypes2.default.object,
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number
  }),
  userId: _propTypes2.default.number,
  countViewMaterial: _propTypes2.default.func,
  countDownloadMaterial: _propTypes2.default.func
};
Material.contextTypes = {
  openLoginModal: _propTypes2.default.func,
  config: _propTypes2.default.object
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    userId: state.user.id
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    countViewMaterial: function countViewMaterial(params) {
      dispatch(Actions.countViewMaterial(params));
    },
    countDownloadMaterial: function countDownloadMaterial(params) {
      dispatch(Actions.countDownloadMaterial(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Material);