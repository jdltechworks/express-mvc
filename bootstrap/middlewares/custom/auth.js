module.exports = function(req, res, next) {
  res.collection = { test: 'test' };
  next();
}
