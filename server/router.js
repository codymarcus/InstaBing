const Authentication = require('./controllers/authentication');
const Images = require('./controllers/images');
const Users = require('./controllers/users');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Image routes
  app.get('/images', Images.get);
  app.post('/images/save', requireAuth, Images.save);
  app.post('/images/update_comment', requireAuth, Images.updateComment);
  // User routes
  app.get('/users', Users.get);
  app.get('/users/search', Users.search);
  // Auth routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
