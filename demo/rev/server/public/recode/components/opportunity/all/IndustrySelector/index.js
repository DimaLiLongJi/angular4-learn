'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndustrySelector = function (_Component) {
  _inherits(IndustrySelector, _Component);

  function IndustrySelector(props) {
    _classCallCheck(this, IndustrySelector);

    var _this = _possibleConstructorReturn(this, (IndustrySelector.__proto__ || Object.getPrototypeOf(IndustrySelector)).call(this, props));

    _this.selectTag = function (tag) {
      _this.setState({
        industryId: tag.id
      });
      _this.props.changeParams(tag.id);
    };

    _this.toggleList = function () {
      _this.setState({
        listStatus: !_this.state.listStatus
      });
    };

    _this.groupTag = function (tagArray) {
      var newArr = [];
      var tempArr = [];
      var width = 850;
      var currentLineWidth = 0;
      var num = 0;
      var nameWidth = 0;
      tagArray.forEach(function (tag, index, array) {
        num = 0;
        if (/\//g.test(tag.name)) {
          num = tag.name.match(/\//g).length;
        }
        nameWidth = 5 * num + 30 + (tag.name.length - num) * 13;
        if (currentLineWidth + nameWidth <= width) {
          currentLineWidth += nameWidth;
          tempArr.push(tag);
        } else {
          currentLineWidth = 0;
          newArr.push(tempArr);
          tempArr = [];
        }
        if (index === array.length - 1) {
          newArr.push(tempArr);
        }
      });
      return newArr;
    };

    _this.state = {
      industryId: props.defaultIndustryId || 0,
      listStatus: false
    };
    return _this;
  }

  _createClass(IndustrySelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tagList = this.groupTag([{
        id: 0,
        name: '不限'
      }].concat(_toConsumableArray(this.props.industryTag)));
      if (!this.state.listStatus) {
        tagList.splice(1, tagList.length - 1);
      }
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('industry-keywrod-container', {
            'hide-more-industry': !this.state.listStatus
          }) },
        _react2.default.createElement(
          'label',
          { className: 'category' },
          '\u884C\u4E1A\u7C7B\u522B\uFF1A'
        ),
        _react2.default.createElement(
          'div',
          { className: 'group-wrap' },
          tagList.map(function (group, index) {
            return _react2.default.createElement(
              'ul',
              { className: 'tag-list', key: index },
              group.map(function (tag) {
                return _react2.default.createElement(
                  'li',
                  { key: tag.name, onClick: function onClick() {
                      return _this2.selectTag(tag);
                    } },
                  _react2.default.createElement(
                    'a',
                    { className: (0, _classnames2.default)({ selected: _this2.state.industryId === tag.id }), href: 'javascript:;' },
                    tag.name
                  )
                );
              })
            );
          })
        ),
        _react2.default.createElement(
          'label',
          { className: 'more' },
          _react2.default.createElement(
            'a',
            { href: 'javascript:;', onClick: this.toggleList },
            '\u66F4\u591A',
            _react2.default.createElement('i', { className: (0, _classnames2.default)('iconfont', {
                'icon-yuanxingsanjiaoxia-': !this.state.listStatus,
                'icon-yuanxingsanjiaoshang-': this.state.listStatus
              }) })
          )
        )
      );
    }
  }]);

  return IndustrySelector;
}(_react.Component);

IndustrySelector.propTypes = {
  industryTag: _propTypes2.default.array.isRequired,
  changeParams: _propTypes2.default.func.isRequired
};
exports.default = IndustrySelector;