var path = require('path');
var getControllers = require('include-all');

var controllers = getControllers({
  dirname: path.join(__dirname, '../../api/controllers'),
  filter : /(.+)Controller\.js$/,
});

module.exports = function(req, res, next) {
  console.log(controllers); 
  next();
}