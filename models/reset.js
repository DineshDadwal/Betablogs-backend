var mongoose = require('mongoose');
var reset = mongoose.Schema({
 email: String

})

module.exports = mongoose.model('Reset',reset);