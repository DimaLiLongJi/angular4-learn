// if (getParameterByName('action', window.location.href) === 'apply') {
//   window.location.href = `/mobile/apply?opportunityId=${oppId}`;
// }
const btn = document.getElementById('apply-link');
const list = document.getElementById('email-list');
const goBackBtn = document.getElementById('go-back-btn');
const goHistoryBtn = document.getElementById('go-history-btn');

if (goHistoryBtn) {
  goHistoryBtn.onclick = function () {
    // if (document.referrer) {
    //   window.location.href = document.referrer;
    // } else {
    //   window.open('/mobile', '_self');
    // }
    window.cfGoHistory({
      url: '/mobile',
      target: '_self',
    });
  };
}

if (goBackBtn) {
  goBackBtn.onclick = function goBack() {
    const companyId = this.getAttribute('data-id');
    if (getParameterByName('source', window.location.href) === 'companyDetail') {
      window.history.back(-1);
    } else {
      window.location.href = `/company/${companyId}`;
    }
  };
}
let available = true;
$(() => {
  if (btn && list) {
    btn.addEventListener('click', () => {
      if (!USER || !USER.id) {
        // window.location.href = `/auth?apply=${oppId}`;
        localStorage.historyLen = window.history.length;
        localStorage.historyUrl = `/opportunity/${oppId}`;
        window.location.href = `${baseUrls.BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${baseUrls.BASE_URL}/mobile/apply?opportunityId=${oppId}`)}`;
      } else {
        if (!available) {
          return;
        }
        window.location.href = `/mobile/apply?opportunityId=${oppId}`;
      }
    });

    const ajaxObj = {
      url: `${baseUrls.BASE_URL}/api/users/favorite?userId=${USER && USER.id}&entityType=opportunity&entityId=${oppId}`,
      data: {
        userId: USER && USER.id,
        entityType: 'opportunity',
        entityId: oppId,
      },
      method: 'POST',
      cache: false,
    };

    if (opp.isFavorite) {
      $('#favorOpp').hide();
      $('#unFavorOpp').show();
    } else {
      $('#favorOpp').show();
      $('#unFavorOpp').hide();
    }
    if (!opp.isFavorite && getParameterByName('favorite', window.location.href)) {
      $('#favorOpp').hide();
      $('#unFavorOpp').show();
      ajaxObj.method = 'POST';
      $.ajax(ajaxObj);
    }

    $('#favorOpp').click(function () {
      if (!USER || !USER.id) {
        window.location.href = `${baseUrls.BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${baseUrls.BASE_URL}/opportunity/${oppId}?favorite=true`)}`;
        return;
      }
      $(this).hide();
      $('#unFavorOpp').show();
      ajaxObj.method = 'POST';
      $.ajax(ajaxObj);
    });
    $('#unFavorOpp').click(function () {
      $(this).hide();
      $('#favorOpp').show();
      ajaxObj.method = 'DELETE';
      $.ajax(ajaxObj);
    });
  }
});

function checkAvailable() {
  if (USER && USER.id) {
    $.getJSON(`/api/users/${USER.id}/applications/${oppId}/available?t=${new Date()}`, (result) => {
      available = result && result.available;
      if (!result || !result.available) {
        $('#apply-link').addClass('disabled');
      } else if (getParameterByName('action', window.location.href) === 'apply') {
        // window.location.href = `/mobile/apply?opportunityId=${oppId}&&skipLogin=true`;
      }
    });
  }
}
checkAvailable();
window.onpageshow = checkAvailable;

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
(() => {
  // FastClick.attach(document.body);
  const shareImage = '/images/recruit-share.jpg';
  let link;
  let title;
  let desc;
  let imgUrl;

  opp.desc = `${opp.description.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '')
    .replace(/\s/g, '')
    .replace(/<\/?[^>]*>/g, '')
    .trim()
    .substr(0, 200)}……`;

  // $transitions.onSuccess({}, (trans) => {
  //   $timeout(() => reConfig(trans.$to().name), 1);
  // });
  reConfig();

  function reConfig() {
    const xhr = new XMLHttpRequest();
    title = `【求职学堂-职业蛙】${opp.position}`;
    desc = opp.desc;
    imgUrl = /default/.test(opp.companyDetail.imageUrl) ? '/images/share.jpg' : opp.companyDetail.imageUrl;
    imgUrl = encodeURI(imgUrl);
    xhr.addEventListener('load', configWX);
    link = location.href;
    xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
    xhr.send();
  }

  function configWX() {
    const config = JSON.parse(this.responseText);
    config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline'];

    wx.config(config);

    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl,
        type: 'link',
        success() {},
        cancel() {},
      });

      wx.onMenuShareTimeline({
        title,
        desc,
        link,
        imgUrl,
        success() {},
        cancel() {},
      });
    });
  }
})();
