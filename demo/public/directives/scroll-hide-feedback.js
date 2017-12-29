angular.module('App').directive('scrollHideFeedback', () => {
  return {
    restrict: 'A',
    scope: false,
    link: _link,
  };

  function _link(scope, elm, attr) {
    const raw = elm[0];
    const userFeedback = angular.element(document.querySelector('.user-feedback'));
    userFeedback.removeClass('hide-user-feedback');
    let hideFlag = false;

    elm.bind('scroll', () => {
      if (raw.scrollTop > 15 && hideFlag === false) {
        userFeedback.toggleClass('hide-user-feedback');
        hideFlag = true;
      } else if (raw.scrollTop <= 15 && hideFlag === true) {
        userFeedback.toggleClass('hide-user-feedback');
        hideFlag = false;
      }
    });
  }
});
