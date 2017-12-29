
const btn = document.getElementById('apply-link');
const list = document.getElementById('email-list');
const backBtn = document.getElementById('back-btn');

let available = true;
$(() => {
  backBtn.addEventListener('click', () => {
    window.cfGoHistory({
      url: '/university_tour',
      target: '_system',
    });
  });
  if (btn && list) {
    btn.addEventListener('click', () => {
      const applyLink = `/mobile/apply?opportunityId=${oppId}&pasteUrl=${encodeURIComponent('careerfrog.com.cn/uk')}`;
      if (!USER || !USER.id) {
        // window.location.href = `/auth?apply=${oppId}`;
        localStorage.historyLen = window.history.length;
         window.location.href = `${baseUrls.BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${baseUrls.BASE_URL}${applyLink}`)}`;
      } else {
        if (!available) {
          return;
        }
        window.location.href = applyLink;
      }
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
// window.location.reload()
window.onpageshow = checkAvailable;
// window.onload = checkAvailable;

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
    //FastClick.attach(document.body);
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

    reConfig();
    function reConfig() {
      const xhr = new XMLHttpRequest();
      title = `【环英嘉年华】${opp.position}`;
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
