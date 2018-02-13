const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
  //JWT -> standard convention.
  // Json web token have a sub property
  //sub -> subject meaning
  //iat -> issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: 'You must provide email and password'});
  }
  // See if user with a specific email exists
  User.findOne({email: email}, function(err, existing){
    //handles the case if database fails
    if(err){ return next(err); }
    //If user with email does exist, return an error
    if(existing){
      return res.status(422).send({error: 'Email is in use'});
    }

    //if a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if(err){ return next(err); }
      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user)});
    });
  });
}
