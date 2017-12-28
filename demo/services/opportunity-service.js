const cfAdminService = require('./cf-admin-service');
const favoriteService = require('./user/favorite');

const moment = require('moment');
const logger = require('../utils/logger')('opp-service');

let opportunityCount = 0;
let timer = null;

module.exports = {
  getOpportunityList,
  getCustomizedOpportunityList,
  getOpportunityCount,
  getIndustryStatistics,
  getDetail,
  getLocationList,
  getListGroupBycategory,
  getCompanyStatistics,
  getRecruitCompanyList,
  getCampusRecruitRecommend,
  getCompanyCampusOpportunities,
  getRecruitCountdown,
};

function getOpportunityList(pms) {
  pms.type = 0;
  pms.status = 2;
  pms.enabled = 1;
  pms.noApplyLink = 1;
  if (!pms.categoryId) {
    pms.categoryIds = [47, 50];
  }

  const params = {
    method: 'get',
    qs: pms,
    uri: 'opportunities',
  };
  return cfAdminService.execRpWithOptions(params)
    .then((result) => {
      const opps = [];
      result.opps.forEach((o) => {
        const opp = parseOpp(o);
        if (opp) {
          opps.push(opp);
        }
      });
      const dValue = result.opps.length - opps.length;
      result.opps = opps;
      result.totalItems -= dValue;
      return result;
    });
}

function getCustomizedOpportunityList(pms) {
  const params = {
    method: 'get',
    qs: pms,
    uri: 'opportunities/customize',
  };
  return cfAdminService.execRpWithOptions(params);
}

function getOpportunityCount(pms) {
  if (timer) {
    return Promise.resolve(opportunityCount);
  }
  pms.status = 2;
  pms.type = 0;
  pms.enabled = 1;
  pms.noApplyLink = 1;
  pms.categoryIds = [47, 50];
  const params = {
    method: 'get',
    qs: pms,
    uri: 'opportunities/count',
  };
  return cfAdminService.execRpWithOptions(params)
    .then((result) => {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, 60000);
      opportunityCount = result;
      return result;
    });
}

function parseOpp(opp) {
  const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
  if (opp && opp.detail) {
    const detail = Object.assign({}, opp.detail);
    delete detail.opportunityId;
    Object.assign(opp, detail);
  }
  delete opp.detail;
  const emailArray = opp.description.match(emailReg);
  if (!emailArray) {
    return null;
  }
  return opp;
}

function getIndustryStatistics(pms) {
  const params = {
    method: 'get',
    qs: pms,
    uri: 'opportunities/statistics/industry',
  };
  return cfAdminService.execRpWithOptions(params);
}

async function getDetail(pms) {
  const params = {
    method: 'get',
    uri: `opportunities/${pms.id}`,
  };
  let result;
  try {
    result = await cfAdminService.execRpWithOptions(params);
  } catch (e) {
    logger.error('get opp detail err is', e);
    return null;
  }
  if (!result || result.type === 1) {
    return null;
  }

  let obj;
  for (obj in result.detail) {
    result[obj] = result.detail[obj];
  }
  delete result.detail;

  result.companyDetail = formatCompany(result.company);
  if (result.locations && result.locations.length > 0) {
    result.locationText = result.locations.map(l => l.name).join('、');
  }
  result.publishDate = moment(result.publishDate).format('YYYY-MM-DD');
  if (pms.userId) {
    const checkResult = await favoriteService.checkUserFavorite({
      type: 'opportunity',
      userId: pms.userId,
      entityId: pms.id,
    });
    result.isFavorite = checkResult.isFavorite;
  }
  return result;
}

function getLocationList(pms) {
  const params = {
    method: 'get',
    qs: pms,
    uri: 'opportunities/statistics/location',
  };
  return cfAdminService.execRpWithOptions(params);
}

function getListGroupBycategory(params) {
  const options = {
    method: 'get',
    qs: params,
    uri: 'opportunities/group_by_category',
  };
  return cfAdminService.execRpWithOptions(options);
}

function getCompanyStatistics(params) {
  const options = {
    method: 'get',
    qs: params,
    uri: 'campus_recruits/companies/statistics',
  };
  return cfAdminService.execRpWithOptions(options);
}

function getRecruitCompanyList(params) {
  const options = {
    method: 'get',
    qs: params,
    uri: 'campus_recruits/companies',
  };
  console.log('getRecruitCompanyList options:', options);
  return cfAdminService.execRpWithOptions(options);
}

function getCompanyCampusOpportunities(companyId) {
  const options = {
    method: 'get',
    uri: `/campus_recruits/companies/${companyId}/opportunities`,
  };
  console.log('getRecruitCompanyCampusOpportunities options:', options);
  return cfAdminService.execRpWithOptions(options);
}

function getCampusRecruitRecommend(id) {
  const options = {
    method: 'get',
    qs: { opportunityId: id, },
    uri: 'campus_recruits/companies/recommend',
  };
  console.log('getCampusRecruitRecommend options:', options);
  return cfAdminService.execRpWithOptions(options);
}

function formatCompany(company) {
  let companyDetail = company;
  if (company && company.id) {
    if (!company.averageSalary) {
      companyDetail.averageSalary = '暂无';
    }
    if (!company.size) {
      companyDetail.size = { name: '暂无', };
    }
    if (!company.industry) {
      companyDetail.industry = { name: '暂无', };
    }
  } else if (!company) {
    companyDetail = {
      name: '暂无',
      imageUrl: 'default',
      averageSalary: '暂无',
      size: { name: '暂无', },
      industry: { name: '暂无', },
    };
  }
  return companyDetail;
}

function getRecruitCountdown(params) {
  const options = {
    method: 'get',
    qs: params,
    uri: 'campus_recruits/countdown_list',
  };
  return cfAdminService.execRpWithOptions(options);
}
