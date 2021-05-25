var mongoose = require('mongoose');
var admin = mongoose.Schema({
  email: String,
  password: String
})

module.exports = mongoose.model('Admin',admin);