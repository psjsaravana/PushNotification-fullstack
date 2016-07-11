var mongoose = require( 'mongoose' );
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  name: {
    type: String,
    unique: true
  },
  password:{
    type: String
  }
});

mongoose.model('User', userSchema);
