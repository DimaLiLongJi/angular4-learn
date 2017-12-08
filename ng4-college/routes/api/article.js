const router = require('express').Router();
const articleService = require('../../services/article');

module.exports = router;

router.get('/articles', (req, res) => {
  articleService.getArticle(req.query)
    .then((result) => {
      result.articles.forEach((a) => {
        a.content = a.content.replace(/(文章来源|来源).*http.*<\/a>/, '');
        try {
            a.text = a
            .content.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '')
            .replace(/<\/?[^>]*>/g, '')
            .trim()
            .substr(0, 80) + '……';
        } catch (e) {
          console.error(e);
        }
        return a;
      });
      res.json(result);
    });
});
