var path = require('path');
var getControllers = require('include-all');

var controllers = getControllers({
  dirname: path.join(__dirname, '../../api/controllers'),
  filter : /(.+)Controller\.js$/,
});

module.exports = function(req, res, next) {
  if(!_.eq(req.path, '/api')) {
    //Use blueprint
  }

  var routes = req.path.replace(/\//, '');
  if(_.gt(_.size(routes), 1)) {

  }
  //controller[](req, res, next);
  next();
}