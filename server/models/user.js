//exact definition of what the model is
//sets expectations for mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model -> has an email and password
//We want to enforce uniqueness so that
//the same username, email etc can't be used twice
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//create model class
//model userSchema corresponds to user
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
