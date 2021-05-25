var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var register = mongoose.Schema({
   firstName:String,
   lastName:String,
   email:String,
   password:String,
   confirm:String,
   DOB:Date,
   phone:Number,
   gender:String,
   profile:String,
})

module.exports = mongoose.model('Register',register);