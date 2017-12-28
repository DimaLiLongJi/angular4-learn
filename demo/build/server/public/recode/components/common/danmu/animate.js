'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.terminate = terminate;
exports.getAnimationStatus = getAnimationStatus;
exports.toggleAnim = toggleAnim;
exports.seekAnim = seekAnim;
exports.initAnim = initAnim;

var _animejs = require('animejs');

var _animejs2 = _interopRequireDefault(_animejs);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animPlaying = 1;
var enforcedPause = 0;
var TLcontrols = void 0;

function terminate() {
  if (TLcontrols) {
    TLcontrols.pause();
    TLcontrols = undefined;
  }
}

function getAnimationStatus() {
  return animPlaying;
}

function toggleAnim(onoff, enforced) {
  if (!TLcontrols) return;
  if (onoff !== 1 && animPlaying === 1) {
    // console.log('TLcontrols.pause');
    TLcontrols.pause();
    animPlaying = 0;
    if (enforced) enforcedPause = 1;
    return;
  }
  if (enforcedPause === 1 && !enforced) return;
  // console.log('TLcontrols.play');
  if (onoff !== 0 && animPlaying === 0) {
    TLcontrols.play();
    animPlaying = 1;
    enforcedPause = 0;
  }
}

function seekAnim(value) {
  // console.log('TLcontrols', TLcontrols);
  if (!TLcontrols) return;
  TLcontrols.pause();
  // console.log('TLcontrols.seek');
  TLcontrols.seek(TLcontrols.duration * (value / 100));
  updateProgress(value);
  TLcontrols.play();
}

function updateProgress(val) {
  // console.log("ge.setItem('animP", val);
  if (val) sessionStorage.setItem('animProgress', val);
}

function initAnim(props, startover) {
  if (TLcontrols) {
    TLcontrols.pause();
  }

  var _genAnimaParams = genAnimaParams(props.danmuDisplayArray),
      width = _genAnimaParams.width,
      duration = _genAnimaParams.duration;

  TLcontrols = _animejs2.default.timeline({
    loop: true,
    easing: 'linear',
    update: (0, _utils.interval)(function (anim) {
      return updateProgress(anim.progress);
    }, 500)
  });

  TLcontrols.add({
    targets: '#TLcontrols .dan-group',
    left: [{
      value: '-' + width + 'px'
    }],
    easing: 'linear',
    duration: duration
  });

  if (startover) return seekAnim(0);
  var progress = sessionStorage.getItem('animProgress');
  // console.log('progress', progress);
  if (progress) seekAnim(progress);
}

function genAnimaParams(danmuDisplayArray) {
  var widthArray = [];
  var durationArray = [];
  Object.keys(danmuDisplayArray).forEach(function (key) {
    widthArray.push(parseInt(danmuDisplayArray[key].totalWidth, 10));
    durationArray.push(parseInt(danmuDisplayArray[key].loopTime * 1000, 10));
  });
  return {
    width: Math.max.apply(Math, widthArray),
    duration: Math.max.apply(Math, durationArray)
  };
}