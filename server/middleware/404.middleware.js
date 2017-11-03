module.exports = (req, res, next) => {
  res.status(404);
  res.render('pages/error/404.nunjucks');
};
