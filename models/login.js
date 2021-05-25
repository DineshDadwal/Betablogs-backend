var mongoose = require('mongoose');
var login = mongoose.Schema({
 email: String,
 password: String,


})

module.exports = mongoose.model('Login',login);