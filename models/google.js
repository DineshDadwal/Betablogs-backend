var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var google = mongoose.Schema({
   $R: String,
   Qt: String,
   Ue: String,
   eU: String
  
})

module.exports = mongoose.model('Google',google);