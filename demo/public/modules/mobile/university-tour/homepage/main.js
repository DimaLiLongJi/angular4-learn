/* global $ API_BASE_URL wx */
import '../../../../vendors/jquery.scrollspy';

(() => {
  $(() => {
    // FastClick.attach(document.body);
    document.addEventListener('scroll', throttle(navCtrl));
    const $navs = $('.navs');
    const $body = $('body');
    const $scrollToTop = $('.scroll-to-top');
    const $applyBanner = $('.apply-banner');
    const navBarOffsetTop = $navs.offset().top;
    const scrollTopAnchorOffset = $('.scroll-top-anchor').offset().top;
    const navsHeight = $navs.height();


    $scrollToTop.click(() => {
      $('html, body').animate({
        scrollTop: 0,
      }, () => {
        $scrollToTop.removeClass('show');
      });
    });

    $.getJSON(`${API_BASE_URL}/companies/university_tour`).done((result) => {
      console.log(result);
      if (!result || result.length <= 0) {
        return;
      }
      const otherCompanies = result.filter(company => company.id != 19051 && company.id != 3155 && company.id != 9262);
      const $otherCompanies = $('#otherCompanies');
      const $companyTemplate = $otherCompanies.find('.company');
      otherCompanies.forEach((company) => {
        const $company = $companyTemplate.clone();
        $company.attr('href', `/university_tour/company/${company.id}`);
        $company.find('.avatar').css('background-image', `url("${company.imageUrl || '/images/default-logo.png'}")`);
        $company.find('.company-name').text(company.name);
        $company.find('.company-desc').text(company.companyLabel);
        $company.appendTo($otherCompanies).show();
      });
      $companyTemplate.remove();
      $navs.scrollspy({
        offset: -navsHeight,
        animate: true,
      });

      navCtrl();
    })
    .fail((err) => {
      console.error('err', err);
      $navs.scrollspy({
        offset: -navsHeight,
        animate: true,
      });
      navCtrl();
    });
    let lastScrollPos = 999999999;
    function navCtrl() {
      const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0)
      if (scrollTop >= navBarOffsetTop && !$navs.hasClass('fixed')) {
        $navs.addClass('fixed');
        $body.addClass('navProp');
      } else if (scrollTop < navBarOffsetTop && $navs.hasClass('fixed')) {
        $navs.removeClass('fixed');
        $body.removeClass('navProp');
      }
      if (scrollTop > scrollTopAnchorOffset && !$scrollToTop.hasClass('show')) {
        $scrollToTop.addClass('show');
      } else if (scrollTop < scrollTopAnchorOffset && $scrollToTop.hasClass('show')) {
        $scrollToTop.removeClass('show');
      }
      if (scrollTop > lastScrollPos && !$applyBanner.hasClass('show')) {
        $applyBanner.addClass('show');
      } else if (scrollTop < lastScrollPos && $applyBanner.hasClass('show')) {
        $applyBanner.removeClass('show');
      }
      lastScrollPos = scrollTop;
    }

    function throttle(fn, context) {
      let scrollTimer = null;
      return function () {
        if (scrollTimer) {
          return;
        }
        const args = arguments;
        scrollTimer = setTimeout(() => {
          fn.apply(context, Array.prototype.slice.call(args));
          clearTimeout(scrollTimer);
          scrollTimer = null;
        }, 100);
      };
    }
    wxShare();
    function wxShare() {
      const xhr = new XMLHttpRequest();
      let link;
      const title = '2018环英校招嘉年华';
      const desc = '名校环英30天，走进15余所顶尖名校，宣讲企业文化，精选名企职位投递，直达HR邮箱';
      const imgUrl = '/images/university-tour/careerfrog-logo.jpg';
      xhr.addEventListener('load', configWX);
      link = location.href;
      xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
      xhr.send();
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
            title: '2018环英校招嘉年华——走进11所英伦名校/500强内推/现场OFFER',
            desc,
            link,
            imgUrl,
            success() {},
            cancel() {},
          });
        });
      }
    }
  });
})();
