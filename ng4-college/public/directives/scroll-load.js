angular.module('App').directive('scrollLoad', () => {
  return (scope, elm, attr) => {
    const raw = elm[0];
    let timer = null;

    elm.bind('scroll', () => {
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - 100) {
          scope.$apply(attr.scrollLoad);
        }

        clearTimeout(timer);
        timer = null;
      }, 1000);
    });
  };
});
