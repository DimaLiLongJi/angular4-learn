'use strict';

function injectAnalytics(res, options = {}) {
  var injectHtml = '';
  // growingIO
  injectHtml += `<script type='text/javascript'>
      var _vds = _vds || [];
      window._vds = _vds;
      (function() {
        _vds.push(['setAccountId', 'a8ee617fe6737f35']);
        (function() {
          var vds = document.createElement('script');
          vds.type = 'text/javascript';
          vds.async = true;
          vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(vds, s);
        })();
      })();
    </script>`;
  if (options.isMobile) {
    injectHtml += '<script type="text/javascript" src="https://assets.growingio.com/sdk/wx/vds-wx-plugin.js"></script>';
  }
  // baidu
  injectHtml += `<script>
      (function(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https'){
         bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else{
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(bp, s);
      })();
    </script>`;
  // ga
  injectHtml += `
    <script>
      (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
      ga('create', 'UA-71354691-5', 'auto');
      ga('send', 'pageview');
    </script>`;

  return (err, html) => {
    if (err) {
      console.log('render error at injectAnalytics: ', err);
      res.status(500).send(err);
    }
    if (options.injectCheck === false || !process.env.NODE_ENV) {
      res.send(html);
    } else {
      var htmlArr = html.split('</head>');
      htmlArr[0] = htmlArr[0] + injectHtml;
      res.send(htmlArr.join('</head>'));
    }
  };
}
module.exports = injectAnalytics;