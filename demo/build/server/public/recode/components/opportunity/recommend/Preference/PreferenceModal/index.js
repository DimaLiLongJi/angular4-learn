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

var _antd = require('antd');

var _hotCity = require('../../../../../constants/hotCity');

var _commonOpportunity = require('../../../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _recommendOpportunity = require('../../../../../actions/recommendOpportunity');

var RecommendOppActions = _interopRequireWildcard(_recommendOpportunity);

var _TagList = require('./TagList');

var _TagList2 = _interopRequireDefault(_TagList);

var _StepLine = require('./StepLine');

var _StepLine2 = _interopRequireDefault(_StepLine);

var _NextStepBtn = require('./NextStepBtn');

var _NextStepBtn2 = _interopRequireDefault(_NextStepBtn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// actions


var PreferenceModal = function (_Component) {
	_inherits(PreferenceModal, _Component);

	function PreferenceModal(props) {
		_classCallCheck(this, PreferenceModal);

		var _this = _possibleConstructorReturn(this, (PreferenceModal.__proto__ || Object.getPrototypeOf(PreferenceModal)).call(this, props));

		_this.initData = function () {
			var _p = _this.props;
			if (!_p.industryTag.length) _p.getIndustryTag({ type: 0 });
			if (!_p.professionTag.length) _p.getProfessionTag();
			if (!_p.questionTag.length) _p.getQuestionTag({ category: 'college_qa_type' });
		};

		_this.handleCancel = function () {
			_this.props.toggleModal();
		};

		_this.selectTag = function (index, tag) {
			var selectedTagBackup = _this.state.selectedTag;
			var action = selectedTagBackup[index].some(function (selectTag) {
				return selectTag.name === tag.name;
			});
			if (action) {
				selectedTagBackup[index] = selectedTagBackup[index].filter(function (selectTag) {
					return selectTag.name !== tag.name;
				});
			} else {
				selectedTagBackup[index].push(tag);
			}
			_this.setState({
				selectedTag: selectedTagBackup
			});
		};

		_this.nextStep = function () {
			var num = _this.state.num;
			if (num >= 3) {
				_this.submit();
			} else {
				_this.setNumState(_this.state.num + 1);
			}
		};

		_this.goStep = function (num) {
			var currentNum = _this.state.num;
			if (num > currentNum && !_this.state.selectedTag[currentNum].length) return;
			if (num - _this.state.num > 1 && !_this.state.selectedTag.filter(function (tag, index) {
				return index > _this.state.num && index < num;
			}).every(function (tagObj) {
				return tagObj.length;
			})) return;
			_this.setNumState(num);
		};

		_this.setNumState = function (num) {
			_this.setState({ num: num });
		};

		_this.submit = function () {
			var _p = _this.props;
			var _s = _this.state;
			var animationDuration = Math.floor(Math.random() * 5);
			_p.setAnimationDuration(animationDuration);
			_p.updateAnimationDuration(animationDuration);
			var timer = setTimeout(function () {
				_p.initUserWechatInfo({
					userId: _p.user.id
				});
				_p.updateUserCustomizeStatus({
					customizeStatus: 'customized'
				});
				clearTimeout(timer);
			}, animationDuration * 1000);
			_p.updateUserCustomizeStatus({
				customizeStatus: 'customizing'
			});
			_p.updateUserPreference({
				industries: _s.selectedTag[0],
				positions: _s.selectedTag[1],
				locations: _s.selectedTag[2],
				stages: _s.selectedTag[3],
				userId: _p.user.id
			});
		};

		_this.buildAllTag = function () {
			var _p = _this.props;
			var _s = _this.state;
			var industryTag = _p.industryTag,
			    questionTag = _p.questionTag,
			    professionTag = _p.professionTag;

			var allTag = [{
				stepNum: 'Step 1',
				title: '你对哪些行业感兴趣？（必选）',
				tagArray: _this.matchSelectedTag(industryTag, _s.selectedTag[0])
			}, {
				stepNum: 'Step 2',
				title: '你对哪些职能感兴趣？（必选）',
				tagArray: _this.matchSelectedTag(professionTag, _s.selectedTag[1])
			}, {
				stepNum: 'Step 3',
				title: '你想要的职位在哪些城市？（必选）',
				tagArray: _this.matchSelectedTag(_hotCity.cityTag, _s.selectedTag[2])
			}, {
				stepNum: 'Step 4',
				title: '你在哪些求职阶段存在疑惑？（必选）',
				tagArray: _this.matchSelectedTag(questionTag, _s.selectedTag[3])
			}];
			return allTag;
		};

		_this.matchSelectedTag = function (wholeTag, selectedTag) {
			return wholeTag.map(function (Tag) {
				if (selectedTag.some(function (cTag) {
					return cTag.id === Tag.id;
				})) {
					Tag.selected = true;
				} else {
					Tag.selected = false;
				}
				return Tag;
			});
		};

		_this.state = {
			selectedTag: [[], [], [], []],
			num: 0
		};
		_this.initData();
		return _this;
	}

	_createClass(PreferenceModal, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_np) {
			if (!_np.user || !_np.user.isPreferenced) return;
			var userPreferences = {};
			if (_np.user && _np.user.preferences) {
				userPreferences = _np.user.preferences;
			}
			if (userPreferences) {
				this.setState({
					selectedTag: [[].concat(_toConsumableArray(userPreferences.industries)), [].concat(_toConsumableArray(userPreferences.positions)), [].concat(_toConsumableArray(userPreferences.locations)), [].concat(_toConsumableArray(userPreferences.stages))]
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _p = this.props;
			var _s = this.state;
			var user = _p.user,
			    industryTag = _p.industryTag,
			    questionTag = _p.questionTag,
			    professionTag = _p.professionTag;

			if (!user.id || !_hotCity.cityTag || !industryTag || !questionTag || !professionTag) return null;
			var allTag = this.buildAllTag();
			var currentStatus = Boolean(_s.selectedTag[this.state.num].length);
			return _react2.default.createElement(
				_antd.Modal,
				{
					visible: this.props.status, width: 800,
					onCancel: this.handleCancel,
					footer: [_react2.default.createElement(_NextStepBtn2.default, { key: 'submit', currentStatus: currentStatus, currentStep: [this.state.num], nextStep: this.nextStep })] },
				_react2.default.createElement(
					'div',
					{ className: 'preference-modal-conainer' },
					_react2.default.createElement(
						'div',
						{ className: 'page-title' },
						_react2.default.createElement(
							'h1',
							null,
							'\u8BBE\u7F6E\u4F60\u7684\u5174\u8DA3\u70B9'
						),
						_react2.default.createElement(
							'p',
							null,
							'\u6211\u4EEC\u5C06\u4F1A\u6839\u636E\u4F60\u7684\u5174\u8DA3\u70B9\u4E3A\u4F60\u63A8\u8350\u804C\u4F4D\u548C\u95EE\u7B54'
						)
					),
					_react2.default.createElement(_StepLine2.default, { allTag: allTag, currentStep: this.state.num, currentStatus: currentStatus, goStep: this.goStep }),
					_react2.default.createElement(
						'div',
						{ className: 'preference-step-wrap' },
						_react2.default.createElement(
							'div',
							{ className: 'preference-step', style: { transform: 'translateX(' + -100 * this.state.num + '%)' } },
							allTag.map(function (tag, index) {
								return _react2.default.createElement(_TagList2.default, { key: index, index: index, tag: tag, selectTag: _this2.selectTag });
							})
						)
					)
				)
			);
		}
	}]);

	return PreferenceModal;
}(_react.Component);

PreferenceModal.propTypes = {
	toggleModal: _propTypes2.default.func,
	customizingInfo: _propTypes2.default.func,
	user: _propTypes2.default.object,
	status: _propTypes2.default.bool
};


var mapStateToProps = function mapStateToProps(state) {
	return {
		professionTag: state.recommendOpp.professionTag,
		questionTag: state.recommendOpp.questionTag,
		industryTag: state.commonOpp.industryTag
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		getIndustryTag: function getIndustryTag(params) {
			dispatch(CommonOppActions.getIndustryTag(params));
		},
		getProfessionTag: function getProfessionTag(params) {
			dispatch(RecommendOppActions.getProfessionTag(params));
		},
		getQuestionTag: function getQuestionTag(params) {
			dispatch(RecommendOppActions.getQuestionTag(params));
		},
		updateUserPreference: function updateUserPreference(params) {
			dispatch(CommonOppActions.updateUserPreference(params));
		},
		updateUserCustomizeStatus: function updateUserCustomizeStatus(params) {
			dispatch(CommonOppActions.updateUserCustomizeStatus(params));
		},
		initUserWechatInfo: function initUserWechatInfo(params) {
			dispatch(CommonOppActions.initUserWechatInfo(params));
		},
		updateAnimationDuration: function updateAnimationDuration(params) {
			dispatch(CommonOppActions.updateAnimationDuration(params));
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PreferenceModal);