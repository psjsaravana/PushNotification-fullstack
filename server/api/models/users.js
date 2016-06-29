var mongoose = require( 'mongoose' );
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  password:{
    type: String
  }
});

mongoose.model('User', userSchema);
