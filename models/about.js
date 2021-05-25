var mongoose = require('mongoose');
var about = mongoose.Schema({
 about:String
})

module.exports = mongoose.model('About',about);