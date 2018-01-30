//this will be where we write our route files.
module.exports = function(app){
  app.get('/', function(req, res, next){
    res.send(['waterbottle', 'phone', 'paper']);
  });
}
