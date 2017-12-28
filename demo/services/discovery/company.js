const cfAdminService = require('../cf-admin-service');
const ukCompanyOrder = require('../../config/uk-company-order');

module.exports = {
  getList,
  getDetail,
  getRecommendList,
  getSimilarCompanyList,
  getSimilarList,
  getUTCompanyList,
};

function getList(params) {
  const requestOption = {
    method: 'GET',
    uri: 'companies',
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption)
    .catch(err => err);
}

function getSimilarCompanyList(companyId) {
  const requestOption = {
    method: 'GET',
    uri: `similar_companies/${companyId}`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption)
    .then((result) => {
      if (result && result.length > 0) {
        return result.map(obj => processCompany(obj));
      }
      return [];
    });
}

function getRecommendList() {
  const requestOption = {
    method: 'GET',
    uri: 'recommend_companies',
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function getDetail(companyId, params) {
  if (!companyId) {
    return Promise.reject({ err: '参数缺失', });
  }
  const requestOption = {
    method: 'GET',
    uri: `companies/${companyId}`,
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption)
    .then((result) => {
      if (result) {
        return processCompany(result);
      }
      return result;
    });
}

function processCompany(company) {
  if (!company.industry) {
    company.industry = {
      name: '暂无',
    };
  }
  if (!company.size) {
    company.size = {
      name: '暂无',
    };
  }
  if (!company.city) {
    company.city = {
      name: '暂无',
    };
  }
  return company;
}

function getSimilarList(companyId) {
  const requestOption = {
    method: 'GET',
    uri: `similar_companies/${companyId}`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

async function getUTCompanyList() {
  const requestOption = {
    method: 'GET',
    uri: 'companies/university_tour',
    json: true,
  };
  const result = await cfAdminService.execRpWithOptions(requestOption);
  const companies = [];
  let i = 0;
  for (const key in ukCompanyOrder) {
    const c = result.filter(r => r.id === ukCompanyOrder[key].id);
    if (c[0]) {
      companies[i] = c[0];
      i++;
    }
  }
  result.forEach((r) => {
    const c = companies.filter(com => r.id === com.id);
    if (!c[0]) {
      companies.push(r);
    }
  });

  return companies;
}
