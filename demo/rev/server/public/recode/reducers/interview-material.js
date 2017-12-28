'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interviewMaterial = require('../constants/interview-material');

var _material = require('../actions/material');

var defaultData = {
  industryList: _interviewMaterial.INDUSTRY_LIST,
  selectedIndustryId: undefined,
  listSearchTips: {},
  listSearchMaterials: {},
  listSearchPapers: {},
  listSearchPreServices: {},
  listSearchParams: {
    keyword: '',
    pageNum: 1,
    industryId: undefined,
    itemsPerPage: 15
  }
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _material.INTM_GET_ALL_MATERIALS:
      return handleAllMaterialList(state, action) || state;
      break;
    case _material.INTM_GET_PARERS:
      return handlePaperList(state, action) || state;
      break;
    case _material.INTM_GET_MATERIALS:
      return handleMaterialList(state, action) || state;
      break;
    case _material.INTM_LIST_KEYWORD_UPDATE:
      return _extends({}, state, {
        listSearchParams: _extends({}, state.listSearchParams, {
          keyword: action.keyword
        })
      });
      break;
    case _material.INTM_LIST_INDUSTRYID_UPDATE:
      return _extends({}, state, {
        listSearchParams: _extends({}, state.listSearchParams, {
          industryId: action.industryId
        })
      });
      break;
    case _material.INTM_LIST_COMPANYID_UPDATE:
      return _extends({}, state, {
        listSearchParams: _extends({}, state.listSearchParams, {
          companyId: action.companyId
        })
      });
      break;
    default:
      return state;
  }
};

function handleAllMaterialList(state, action) {
  if (action.stage === 'result') {
    var params = action.params,
        result = action.result;

    result.material.pageNum = Number(result.material.pageNum);
    result.material.itemsPerPage = Number(result.material.itemsPerPage);
    result.material.totalItems = Number(result.material.totalItems);
    result.tips.pageNum = Number(result.tips.pageNum);
    result.tips.itemsPerPage = Number(result.tips.itemsPerPage);
    result.tips.totalItems = Number(result.tips.totalItems);
    result.paper.pageNum = Number(result.paper.pageNum);
    result.paper.itemsPerPage = Number(result.paper.itemsPerPage);
    result.paper.totalItems = Number(result.paper.totalItems);
    result.preservices.pageNum = Number(result.preservices.pageNum);
    result.preservices.itemsPerPage = Number(result.preservices.itemsPerPage);
    result.preservices.totalItems = Number(result.preservices.totalItems);
    return _extends({}, state, {
      listSearchMaterials: result.material,
      listSearchTips: result.tips,
      listSearchPapers: result.paper,
      listSearchPreServices: result.preservices
    });
  }
}

function handlePaperList(state, action) {
  if (action.stage === 'result') {
    var params = action.params,
        result = action.result;

    result.paper.pageNum = Number(result.paper.pageNum);
    result.paper.itemsPerPage = Number(result.paper.itemsPerPage);
    result.paper.totalItems = Number(result.paper.totalItems);
    return _extends({}, state, {
      listSearchPapers: result.paper
    });
  }
}

function handleMaterialList(state, action) {
  if (action.stage === 'result') {
    var params = action.params,
        result = action.result;

    result.material.pageNum = Number(result.material.pageNum);
    result.material.itemsPerPage = Number(result.material.itemsPerPage);
    result.material.totalItems = Number(result.material.totalItems);
    return _extends({}, state, {
      listSearchMaterials: result.material
    });
  }
}