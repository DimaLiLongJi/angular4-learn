/* global company wx */

(() => {
    // const shareImage = '/images/recruit-share.jpg';
    let link;
    let title;
    let desc;
    let imgUrl;
    console.log('company', company);
    if (company.introduction) {
      company.desc = `${company.introduction.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '')
      .replace(/\s/g, '')
      .replace(/<\/?[^>]*>/g, '')
      .trim()
      .substr(0, 200)}……`;
    }

    // $transitions.onSuccess({}, (trans) => {
    //   $timeout(() => reConfig(trans.$to().name), 1);
    // });
    reConfig();
    function reConfig() {
      const xhr = new XMLHttpRequest();
      title = `【求职学堂-职业蛙】${company.name}`;
      desc = company.desc;
      imgUrl = /default/.test(company.imageUrl) ? '/images/share.jpg' : company.imageUrl;
      imgUrl = encodeURI(imgUrl);
      xhr.addEventListener('load', configWX);
      link = location.href;
      xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
      xhr.send();
    }

    function configWX() {
      const config = JSON.parse(this.responseText);
      // config.debug = true;
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
