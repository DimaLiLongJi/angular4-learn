'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// export const statusTxt = {
//   undefined: '全部',
//   waiting: '未开始',
//   ongoing: '进行中',
//   finished: '已结束',
// };
//
var STATUSES = exports.STATUSES = [{
  id: undefined,
  status: undefined,
  text: '全部'
}, {
  id: 1,
  status: 'waiting',
  text: '未开始'
}, {
  id: 2,
  status: 'ongoing',
  text: '进行中'
}, {
  id: 3,
  status: 'finished',
  text: '已结束'
}];
//
// export const statusIdTxt = {
//   undefined: '全部',
//   1: '未开始',
//   2: '进行中',
//   3: '已结束',
// };