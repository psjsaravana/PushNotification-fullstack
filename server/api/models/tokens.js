var mongoose = require( 'mongoose' );

var tokenSchema = new mongoose.Schema({
  token: {
    type: String
  },
  user: {
    type: String
  }
});

mongoose.model('Tokens', tokenSchema);
