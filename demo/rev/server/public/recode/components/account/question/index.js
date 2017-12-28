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

var _reactRouterDom = require('react-router-dom');

var _account = require('../../../actions/account');

var _questionCard = require('./questionCard');

var _questionCard2 = _interopRequireDefault(_questionCard);

var _List = require('../../common/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.genGuideContent = function () {
      return _react2.default.createElement(
        'div',
        { className: 'placeholder' },
        _react2.default.createElement(
          'p',
          null,
          '\u8FD8\u6CA1\u6709\u6536\u5230\u4F60\u7684\u63D0\u95EE\uFF0C'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u5FEB\u53BB\u5F39\u5E55\u533A\u57DF\u5F39\u95EE\u9898\u5427~'
        ),
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/?action=askQuestion' },
          '\u524D\u53BB\u63D0\u95EE'
        )
      );
    };

    _this.genQuestionContent = function () {
      return _react2.default.createElement(
        'p',
        { className: 'warn-tip', 'ng-if': 'vm.totalItems' },
        _react2.default.createElement(
          'svg',
          { className: 'icon', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-xiaodengpao-' })
        ),
        '\u6C42\u804C\u5B66\u5802\u4E13\u5BB6\u5C06\u572848\u5C0F\u65F6\u5185\u56DE\u590D\u4F60\u7684\u63D0\u95EE\u3002\u53EF\u5173\u6CE8\u201C\u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B\u201D\u670D\u52A1\u53F7\uFF0C\u56DE\u590D\u540E\u5C06\u7B2C\u4E00\u65F6\u95F4\u901A\u77E5\u4F60~'
      );
    };

    _this.onPageChange = function (page, pageSize) {
      _this.setState({ pageNum: page });
      _this.props.getQuestionList({
        userId: _this.props.userId,
        pageNum: page,
        itemsPerPage: _this.state.itemsPerPage,
        checkAnswer: 1
      });
    };

    _this.state = {
      itemsPerPage: 10,
      pageNum: 1
    };
    _this.props.getQuestionList({
      userId: _this.props.userId,
      pageNum: _this.state.pageNum,
      itemsPerPage: _this.state.itemsPerPage,
      checkAnswer: 1
    });
    return _this;
  }

  _createClass(Index, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { className: 'question-page' },
        _react2.default.createElement(
          'div',
          { className: 'question-head' },
          _react2.default.createElement(
            'h1',
            { className: 'title-tip' },
            '\u6211\u7684\u95EE\u7B54'
          ),
          this.props.questionList.totalItems ? this.genQuestionContent() : this.genGuideContent()
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _List2.default,
            {
              split: false,
              dataSource: this.props.questionList.questions,
              pagination: {
                pageSize: this.state.itemsPerPage,
                total: this.props.questionList.totalItems || 0,
                current: this.state.pageNum,
                onChange: this.onPageChange
              } },
            _react2.default.createElement(_questionCard2.default, { dataSet: 'question' })
          )
        )
      );
    }
  }]);

  return Index;
}(_react.Component);

Index.propTypes = {
  questionList: _propTypes2.default.object,
  deleteResult: _propTypes2.default.object,
  userId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  getQuestionList: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    userId: store.user.id,
    user: store.user,
    questionList: store.userQuestions.questionList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getQuestionList: function getQuestionList(params) {
      dispatch((0, _account.getQuestionList)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Index);