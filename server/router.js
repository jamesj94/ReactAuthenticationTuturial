//this will be where we write our route files.
const Authentication = require('./controllers/authentication');

module.exports = function(app){
  app.post('/signup', Authentication.signup); 
}
