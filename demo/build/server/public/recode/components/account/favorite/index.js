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

var _List = require('../../common/List');

var _List2 = _interopRequireDefault(_List);

var _qaCard = require('./qaCard');

var _qaCard2 = _interopRequireDefault(_qaCard);

var _positionCard = require('./positionCard');

var _positionCard2 = _interopRequireDefault(_positionCard);

var _userFavorite = require('../../../actions/userFavorite');

var UserFavoriteActions = _interopRequireWildcard(_userFavorite);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.getUserFavoritesList = function (pageNum) {
      var section = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.section;

      _this.props.getUserFavoritesList({
        userId: _this.props.userId,
        itemsPerPage: _this.state.itemsPerPage,
        pageNum: pageNum,
        type: section === 0 ? 'opportunity' : 'question'
      });
    };

    _this.selectSection = function (section) {
      _this.getUserFavoritesList(1, section);
      _this.setState({
        section: section,
        pageNum: 1
      });
    };

    _this.onPageChange = function (page, pageSize) {
      _this.setState({ pageNum: page });
      _this.getUserFavoritesList(page);
    };

    _this.cancelFavorite = function (favorite) {
      var entityType = void 0;
      var entityId = void 0;
      if (favorite.opportunity && favorite.opportunity.id) {
        entityType = 'opportunity';
        entityId = favorite.opportunity.id;
      } else if (favorite.question && favorite.question.id) {
        entityType = 'question';
        entityId = favorite.question.id;
      } else {
        return null;
      }

      _this.props.delUserFavorite({
        userId: _this.props.userId,
        entityId: entityId,
        entityType: entityType
      });
    };

    _this.renderList = function () {
      return _react2.default.createElement(
        _List2.default,
        {
          dataSource: _this.props.favoriteList.favorites,
          split: false,
          pagination: {
            pageSize: _this.state.itemsPerPage,
            total: _this.props.favoriteList.totalItems || 0,
            current: _this.state.pageNum,
            onChange: _this.onPageChange
          } },
        _this.state.section === 0 ? _react2.default.createElement(_positionCard2.default, { cancelFavorite: _this.cancelFavorite, dataSet: 'favorite' }) : _react2.default.createElement(_qaCard2.default, { cancelFavorite: _this.cancelFavorite, dataSet: 'favorite' })
      );
    };

    _this.renderSection = function () {
      var favList = _this.renderList();
      var section = void 0;
      if (_this.state.section === 1) {
        section = _react2.default.createElement(
          'div',
          { className: 'favorite-question-container' },
          !_this.props.favoriteList.totalItems ? _react2.default.createElement(
            'div',
            { className: 'placeholder' },
            _react2.default.createElement(
              'p',
              null,
              '\u4F60\u8FD8\u6CA1\u6709\u6536\u85CF\u4EFB\u4F55\u95EE\u7B54\uFF0C'
            ),
            _react2.default.createElement(
              'p',
              null,
              '\u5FEB\u53BBMark\u51E0\u4E2A\u5427\uFF01'
            ),
            _react2.default.createElement(
              'a',
              { href: '/pc/question' },
              '\u53BB\u770B\u5F39\u5E55\u95EE\u7B54'
            )
          ) : _react2.default.createElement(
            'div',
            null,
            favList
          )
        );
      } else {
        section = _react2.default.createElement(
          'div',
          { className: 'favorite-position-container' },
          !_this.props.favoriteList.totalItems ? _react2.default.createElement(
            'div',
            { className: 'placeholder' },
            _react2.default.createElement(
              'p',
              null,
              '\u4F60\u8FD8\u6CA1\u6709\u6536\u85CF\u4EFB\u4F55\u804C\u4F4D\uFF0C'
            ),
            _react2.default.createElement(
              'p',
              null,
              '\u5FEB\u53BB\u770B\u770B\u540D\u4F01\u804C\u4F4D\u5427\uFF01'
            ),
            _react2.default.createElement(
              'a',
              { href: '/pc/opportunity/all' },
              '\u53BB\u770B\u540D\u4F01\u804C\u4F4D'
            )
          ) : _react2.default.createElement(
            'div',
            null,
            favList
          )
        );
      }
      return section;
    };

    _this.state = {
      section: 0,
      itemsPerPage: 10,
      pageNum: 1
    };
    return _this;
  }

  _createClass(Index, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getUserFavoritesList({
        userId: this.props.userId,
        itemsPerPage: this.state.itemsPerPage,
        pageNum: this.state.pageNum,
        type: this.state.section === 0 ? 'opportunity' : 'question'
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.favoriteList.refresh) {
        this.getUserFavoritesList(this.state.pageNum, this.state.section);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { className: 'favorite-page' },
        _react2.default.createElement(
          'div',
          { className: 'favorite-head' },
          _react2.default.createElement(
            'h1',
            { className: 'title-tip' },
            '\u6211\u7684\u6536\u85CF'
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: 'tab-card' },
          _react2.default.createElement(
            'li',
            { className: this.state.section === 0 ? 'active' : '', onClick: this.selectSection.bind(this, 0) },
            _react2.default.createElement(
              'a',
              null,
              '\u804C\u4F4D\u6536\u85CF'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: this.state.section === 1 ? 'active' : '', onClick: this.selectSection.bind(this, 1) },
            _react2.default.createElement(
              'a',
              null,
              '\u95EE\u7B54\u6536\u85CF'
            )
          )
        ),
        this.renderSection()
      );
    }
  }]);

  return Index;
}(_react.Component);

Index.propTypes = {
  favoriteList: _propTypes2.default.object,
  deleteResult: _propTypes2.default.object,
  userId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  getUserFavoritesList: _propTypes2.default.func,
  delUserFavorite: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    userId: state.user.id,
    favoriteList: state.userFavorite.favoriteList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getUserFavoritesList: function getUserFavoritesList(params) {
      dispatch(UserFavoriteActions.getUserFavoritesList(params));
    },
    delUserFavorite: function delUserFavorite(params) {
      dispatch(UserFavoriteActions.deleteUserFavorite(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Index);