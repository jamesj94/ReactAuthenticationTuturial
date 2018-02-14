//this will be where we write our route files.
const Authentication = require('./controllers/authentication');
const passportConfig = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', requireAuth, function(req, res){
    res.send({ hi: 'there' });
  });

  //require signin -> middleware.
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
