'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _question = require('../../actions/question');

var QuestionActions = _interopRequireWildcard(_question);

var _qaCard = require('./qaCard');

var _qaCard2 = _interopRequireDefault(_qaCard);

var _List = require('../common/List');

var _List2 = _interopRequireDefault(_List);

var _ScrollToTop = require('../common/ScrollToTop');

var _ScrollToTop2 = _interopRequireDefault(_ScrollToTop);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Actions

// components


var Question = function (_React$Component) {
  _inherits(Question, _React$Component);

  function Question(props) {
    _classCallCheck(this, Question);

    var _this = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, props));

    _this.favoriteToggle = function (question) {
      var _p = _this.props;
      if (!_p.userId) {
        var params = {
          entityType: 'question',
          entityId: question.id
        };
        sessionStorage.setItem('favQA', JSON.stringify(params));
        _this.context.openLoginModal();
      } else {
        var _params = {
          entityType: 'question',
          entityId: question.id,
          userId: _p.userId
        };
        if (!question.isFavorite) {
          _p.addQuestionFavorite(_params);
        } else {
          _p.cancelQuestionFavorite(_params);
        }
      }
    };

    _this.getQuestionList = function () {
      var pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.pageNum;
      var keyword = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.keyword;

      var _p = _this.props;
      var params = _extends({}, _p.listParams, {
        pageNum: pageNum,
        keyword: keyword
      });
      if (_p.userId) params.userId = _p.userId;
      _p.getQuestionList(params);
    };

    _this.onPageChange = function (page, pageSize) {
      _this.getQuestionList(page);
    };

    _this.selectHotKey = function (key) {
      _this.setState({ keyword: key });
      _this.getQuestionList(1, key);
    };

    _this.searchKeyword = function () {
      _this.getQuestionList(1, _this.state.keyword);
    };

    _this.handleChange = function (e) {
      _this.setState({ keyword: e.target.value });
      _this.getQuestionList(1, e.target.value);
    };

    _this.renderHotKeywords = function () {
      return _react2.default.createElement(
        'ul',
        { className: 'hot-keywords' },
        _react2.default.createElement(
          'li',
          null,
          '\u70ED\u95E8\u641C\u7D22\uFF1A'
        ),
        _this.state.keywords.map(function (k, idx) {
          return _react2.default.createElement(
            'li',
            { key: idx, onClick: _this.selectHotKey.bind(_this, k) },
            _react2.default.createElement(
              'a',
              { className: _this.state.keyword === k ? 'active' : '' },
              k
            )
          );
        })
      );
    };

    _this.state = {
      keywords: ['实习', '通用', '四大/事务所', '咨询', '投行/券商', '快消', '互联网', '行业认知', '简历与网申', '单面与群面'],
      keyword: ''
    };
    return _this;
  }

  _createClass(Question, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.questionList.totalItems) this.getQuestionList();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _p = this.props;
      if (!_p.userId && nextProps.userId) {
        var favQA = sessionStorage.getItem('favQA') && JSON.parse(sessionStorage.getItem('favQA'));
        sessionStorage.removeItem('favQA');
        favQA.userId = nextProps.userId;
        console.log('favQA', favQA);
        _p.addQuestionFavorite(favQA);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _p = this.props;
      return _react2.default.createElement(
        'div',
        { className: 'question-container' },
        _react2.default.createElement(
          'div',
          { className: 'content-wrap' },
          _react2.default.createElement(
            'section',
            { className: 'search-container' },
            _react2.default.createElement(
              'div',
              { className: 'input-container' },
              _react2.default.createElement('input', { type: 'text', name: '', value: this.state.keyword, onChange: this.handleChange, placeholder: '\u8BF7\u8F93\u5165\u4F60\u611F\u5174\u8DA3\u7684\u95EE\u9898\u5173\u952E\u5B57' }),
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', onClick: this.searchKeyword },
                '\u641C\u7D22'
              )
            ),
            this.renderHotKeywords()
          ),
          _react2.default.createElement(
            'section',
            { className: 'section-title' },
            this.state.keyword ? _react2.default.createElement(
              'h2',
              null,
              '\u641C\u7D22\u7ED3\u679C ',
              _react2.default.createElement(
                'span',
                null,
                '\u5171\u8BA1',
                _p.questionList.totalItems,
                '\u6761'
              )
            ) : _react2.default.createElement(
              'h2',
              null,
              '\u5168\u90E8\u95EE\u7B54'
            )
          ),
          _react2.default.createElement(
            _List2.default,
            {
              split: false,
              dataSource: _p.questionList.questions,
              pagination: {
                pageSize: _p.listParams.itemsPerPage,
                total: _p.questionList.totalItems || 0,
                current: _p.listParams.pageNum,
                onChange: this.onPageChange
              } },
            _react2.default.createElement(_qaCard2.default, { favoriteToggle: this.favoriteToggle, dataSet: 'question' })
          )
        ),
        _react2.default.createElement(_ScrollToTop2.default, null)
      );
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      var pms = _extends({}, store.getState().question.listParams, params, {
        userId: store.getState().user.id
      });
      return store.dispatch(QuestionActions.getQuestionList(pms));
    }
  }]);

  return Question;
}(_react2.default.Component);

Question.propTypes = {};
Question.contextTypes = {
  openLoginModal: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    questionList: state.question.questionList,
    userId: state.user.id,
    listParams: state.question.listParams
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getQuestionList: function getQuestionList(params) {
      dispatch(QuestionActions.getQuestionList(params));
    },
    addQuestionFavorite: function addQuestionFavorite(params) {
      dispatch(QuestionActions.addQuestionFavorite(params));
    },
    cancelQuestionFavorite: function cancelQuestionFavorite(params) {
      dispatch(QuestionActions.cancelQuestionFavorite(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Question);