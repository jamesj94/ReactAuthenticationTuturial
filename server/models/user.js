//exact definition of what the model is
//sets expectations for mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model -> has an email and password
//We want to enforce uniqueness so that
//the same username, email etc can't be used twice
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save', function(next){
  //get access to user model
  const user = this;

  //generate a salt (takes some number of miliseconds)
  //then run callback
  bcrypt.genSalt(10, function(err, salt){
    if(err){ return next(err); }

    //hash our password using our salt (encrypts our password)
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){
        return next(err);
      }

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});


//create model class
//model userSchema corresponds to user
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
