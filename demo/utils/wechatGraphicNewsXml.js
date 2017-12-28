
module.exports = function wechatGraphicNewsXml(from, to, articles) {
  let xml = '<xml>';
  xml += `<ToUserName><![CDATA[${to}]]></ToUserName>`;
  xml += `<FromUserName><![CDATA[${from}]]></FromUserName>`;
  xml += `<CreateTime>${new Date().getTime()}</CreateTime>`;
  xml += '<MsgType><![CDATA[news]]></MsgType>';
  xml += `<ArticleCount>${articles.length}</ArticleCount>`;
  xml += '<Articles>';
  articles.map((article) => {
    xml += '<item>';
    xml += `<Title><![CDATA[${article.title}]]></Title>`;
    xml += `<Description><![CDATA[${article.description}]]></Description>`;
    xml += `<PicUrl><![CDATA[${article.picUrl}]]></PicUrl>`;
    xml += `<Url><![CDATA[${article.url}]]></Url>`;
    xml += '</item>';
    return xml;
  });
  xml += '</Articles>';
  xml += '</xml>';
  return xml;
};
