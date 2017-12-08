window.cfGoHistory = ({
  url = '/',
  target = '_self',
} = {}) => {
  if (document.referrer) {
    window.history.back();
  } else {
    window.open(url, target);
  }
};

