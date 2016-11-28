var express = require('express');
var requireAll = require('include-all');
var path = require('path');

var app = express();


global._ = require('lodash');


var services = requireAll({
  dirname: path.join(__dirname, 'api/services'),
  filter : /(.+)\.js$/,
});

/**
 * Export service as globals
 * @param  {[type]} value [description]
 * @param  {[type]} key)  { global[key] [description]
 * @return {[type]}       [description]
 */
_.map(services, function(value, key) {
  global[key] = value;
});

var config = requireAll({
  dirname: path.join(__dirname, 'config'),
  filter : /(.+)\.js$/,
});


var customMiddlewares = requireAll({
  dirname: path.join(__dirname, 'middlewares/custom'),
  filter : /(.+)\.js$/,
});

var middlewares = requireAll({
  dirname: path.join(__dirname, 'middlewares/lib'),
  filter : /(.+)\.js$/,
});

//view engine

var view = config.view;
var viewEngine = _.toString(_.keys(view));

app.set('views', '../views');

app.set(_.keys(viewEngine), view);

var _middlewares = [];
middlewares = _.toArray(middlewares);

_.each(middlewares, function(middleware, key) {
 if( _.isPlainObject(middleware)) {
    _.map(middleware, (mid, key) => {
      _middlewares.push(mid);
    });
 } else {
    _middlewares.push(middleware);
 }
});

app.use(_middlewares);


customMiddlewares = _.toArray(customMiddlewares);

app.get('/*', customMiddlewares, function(req, res, next) {
  res.json(res.collection);
  next();
});


app.listen(3000, function() {
  console.log('listeing to port', 3000);
});