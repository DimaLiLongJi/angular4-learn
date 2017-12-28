'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _danmu = require('../actions/danmu');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var spacingFactor = 300;
var speed = 90;

var defaultData = {
  danmuOn: true,
  newQuestionArray: [],
  newQuestion: {},
  danmuDisplayArray: [{
    danArray: []
  }, {
    danArray: []
  }, {
    danArray: []
  }, {
    danArray: []
  }],
  animProgress: 0,
  questionCount: undefined,
  danmuInput: ''
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _danmu.DM_TOGGLE_DANMU:
      return handleToggle(state, action) || state;
      break;
    case _danmu.DM_TOGGLE_BANNER:
      return _extends({}, state, {
        bannerOn: action.on
      });
      break;
    case _danmu.DM_GET_DANMU:
      return handleGetDanmu(state, action) || state;
      break;
    case _danmu.DM_GET_DANMU_SESSION:
      return handleGetDanmuSession(state, action) || state;
      break;
    case _danmu.DM_SUB_QUESTION:
      return handleSubQs(state, action) || state;
      break;
    case _danmu.DM_UPDATE_PROGRESS:
      return _extends({}, state, {
        animProgress: action.animProgress
      });
      break;
    case _danmu.DM_ADD_FAVORITE:
      return handleFavorite(state, action, 1) || state;
      break;
    case _danmu.DM_RM_FAVORITE:
      return handleFavorite(state, action, 0) || state;
      break;
    case _danmu.DM_CHECK_COUNT:
      return _extends({}, state, {
        questionCount: action.result.count
      });
      break;
    case _danmu.DM_VISIT_COMPANY:
      return handleVisitCompany(state, action) || state;
      break;
    case _danmu.DM_SAVE_INPUT:
      return _extends({}, state, {
        danmuInput: action.value
      });
      break;
    default:
      return state;
  }
};

function handleVisitCompany(state, action) {
  var group = action.group,
      id = action.id;
  var danmuDisplayArray = state.danmuDisplayArray;
  // console.log('group', group);
  // console.log('id', id);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = danmuDisplayArray[group].danArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var d = _step.value;

      if (d.id === id) {
        d.visited = true;
        // console.log(d);
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return _extends({}, state, {
    danmuDisplayArray: [].concat(_toConsumableArray(danmuDisplayArray))
  });
}

function handleFavorite(state, action, isFavorite) {
  var params = action.params;
  var danmuDisplayArray = state.danmuDisplayArray;
  // console.log(params);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = danmuDisplayArray[params.group].danArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var d = _step2.value;

      if (d.id === params.entityId) {
        d.isFavorite = isFavorite;
        // console.log(d);
        break;
      }
    }
    // sessionStorage.setItem('danmuDisplayArray', JSON.stringify(danmuDisplayArray));
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return _extends({}, state, {
    danmuDisplayArray: [].concat(_toConsumableArray(danmuDisplayArray))
  });
}

function handleGetDanmuSession(state, action) {
  var animProgress = action.animProgress,
      danmuDisplayArray = action.danmuDisplayArray;

  return _extends({}, state, {
    animProgress: animProgress,
    danmuDisplayArray: danmuDisplayArray
  });
}

function handleSubQs(state, action) {
  var result = action.result;
  var newQuestion = state.newQuestion,
      newQuestionArray = state.newQuestionArray,
      questionCount = state.questionCount,
      danmuDisplayArray = state.danmuDisplayArray;

  result.visited = true;
  questionCount++;
  newQuestion = result;
  newQuestionArray = [].concat(_toConsumableArray(newQuestionArray), [result]);
  danmuDisplayArray[0].danArray.push(result);
  return _extends({}, state, {
    questionCount: questionCount,
    newQuestion: newQuestion,
    newQuestionArray: newQuestionArray,
    danmuDisplayArray: danmuDisplayArray,
    danmuInput: ''
  });
}

function handleToggle(state, action) {
  var danmuOn = !state.danmuOn;
  return _extends({}, state, {
    danmuOn: danmuOn
  });
}

function handleGetDanmu(state, action) {
  var result = action.result;

  var danMuArray = [];
  var questionArray = [];
  var danmuDisplayArray = [{
    danArray: []
  }, {
    danArray: []
  }, {
    danArray: []
  }, {
    danArray: []
  }];
  if (result.questions && result.questions.userQuestions) {
    result.questions.userQuestions.forEach(function (q) {
      q.visited = true;
    });
    questionArray = [].concat(_toConsumableArray(questionArray), _toConsumableArray(result.questions.userQuestions));
  }
  if (result.questions.publishedQuestions) {
    questionArray = [].concat(_toConsumableArray(questionArray), _toConsumableArray(result.questions.publishedQuestions));
  }
  var qas = [];
  questionArray.forEach(function (q) {
    if (q.answers.length) {
      q.answers.forEach(function (a) {
        var qa = Object.assign({}, q);
        a.originalContent = a.content;
        if (a.content) {
          a.content = a.content.replace(/\n/g, '<br>');
        }
        qa.answer = a;
        qas.push(qa);
      });
    } else {
      q.answer = '';
      qas.push(q);
    }
  });
  questionArray = qas;
  if (result.companies) {
    danMuArray = [].concat(_toConsumableArray(danMuArray), _toConsumableArray(result.companies));
  }
  danMuArray = [].concat(_toConsumableArray(danMuArray), _toConsumableArray(questionArray));
  danMuArray = danMuArray.filter(function (d) {
    return d;
  });
  danMuArray.sort(randomsort);
  danMuArray.forEach(function (elt, i) {
    var index = i % 4;
    var group = danmuDisplayArray[index];
    group.danArray.push(elt);
  });

  return _extends({}, state, {
    danmuDisplayArray: [].concat(_toConsumableArray(setSpeed(danmuDisplayArray)))
  });
}

function setSpeed(danmuDisplayArray) {
  for (var i = 0; i < danmuDisplayArray.length; i++) {
    var group = danmuDisplayArray[i];
    var totalWidth = 0;
    for (var j = 0; j < group.danArray.length; j++) {
      var dan = group.danArray[j];
      dan.styleObj = {
        marginLeft: (Math.random() * spacingFactor).toFixed(0)
      };
      if (dan.title) {
        totalWidth = totalWidth + dan.title.length * 18.3 + 130 + Number(dan.styleObj['marginLeft']);
      } else {
        totalWidth = totalWidth + dan.name.length * 18.3 + 310 + Number(dan.styleObj['marginLeft']);
      }
      dan.styleObj['marginLeft'] += 'px';
    }
    group.loopTime = totalWidth / speed;
    group.totalWidth = totalWidth;
  }
  // sessionStorage.setItem('danmuDisplayArray', JSON.stringify(danmuDisplayArray));
  return danmuDisplayArray;
}

function randomsort() {
  return Math.random() > 0.5 ? -1 : 1;
}