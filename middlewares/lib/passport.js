var passport = require('passport');

module.exports = {
  _session: require('express-session')({ secret: 'ozuno', resave: true, saveUninitialized: true }),
  initialize: passport.initialize(),
  session: passport.session(),
}