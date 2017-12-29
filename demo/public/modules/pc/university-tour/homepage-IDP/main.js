/* global $ API_BASE_URL */
import Cookies from 'js-cookie';

(() => {
  $(() => {
    const $scrollToTop = $('.scroll-to-top');
    const scrollTopAnchorOffset = $('.scroll-top-anchor').offset().top;
    let applyLink = 'https://jinshuju.net/f/H2n0ei';
    if (Cookies.get('x_field_1')) {
      applyLink += `?x_field_1=${Cookies.get('x_field_1')}`;
    }

    $('#toolbar').attr('href', applyLink);
    $('#qr-chat-icon').attr('href', applyLink);
    $('#apply-now').attr('href', applyLink);
    $.getJSON(`${API_BASE_URL}/companies/university_tour`, (result) => {
      if (!result || result.length <= 0) {
        return;
      }
      const otherCompanies = result
        .filter(company => company.id !== 19051 && company.id !== 3155 && company.id !== 9262);
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
    });

    document.addEventListener('scroll', throttle(navCtrl));

    $scrollToTop.click(() => {
      $('html, body').animate({ scrollTop: 0, }, () => {
        $scrollToTop.removeClass('show');
      });
    });

    function navCtrl() {
      const scrollTop = $('body').scrollTop();
      if (scrollTop > scrollTopAnchorOffset && !$scrollToTop.hasClass('show')) {
        $scrollToTop.addClass('show');
      } else if (scrollTop < scrollTopAnchorOffset && $scrollToTop.hasClass('show')) {
        $scrollToTop.removeClass('show');
      }
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
  });
})();
