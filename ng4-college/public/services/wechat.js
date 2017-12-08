/* global FastClick wx */
(function () {
  angular.module('App').factory('wechatService', wechatService);
  wechatService.$inject = ['$resource', 'API_BASE_URL'];

  function wechatService($resource, API_BASE_URL) {
    const service = {
      getTempQrCodeTicket,
      setWxShareInfo,
    };
    return service;

    function getTempQrCodeTicket() {
      return $resource(`${API_BASE_URL}/wechat/temp_qrcode`, null, {}).get().$promise;
    }

    function setWxShareInfo(configObject) {
      // FastClick.attach(document.body);
      // const shareImage = '/images/recruit-share.jpg';
      const link = configObject.link;
      const title = configObject.title;
      const desc = configObject.desc;
      let imgUrl = configObject.imgUrl;

      reConfig();
      function reConfig() {
        const xhr = new XMLHttpRequest();
        imgUrl = encodeURI(imgUrl);
        xhr.addEventListener('load', configWX);
        xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
        xhr.send();
      }

      function configWX() {
        const config = JSON.parse(this.responseText);
        const htmlReg = /<\/?[^>]*>/g;
        // config.debug = true;
        config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline'];

        wx.config(config);

        wx.ready(() => {
          wx.onMenuShareAppMessage({
            title: title.replace(htmlReg, ''),
            desc: desc.replace(htmlReg, ''),
            link,
            imgUrl,
            type: 'link',
            success() {
            },
            cancel() {},
          });

          wx.onMenuShareTimeline({
            title,
            desc,
            link,
            imgUrl,
            success() {
            },
            cancel() {},
          });
        });
      }
    }
  }
}());
