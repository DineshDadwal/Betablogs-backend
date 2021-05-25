var mongoose = require('mongoose');
var views = mongoose.Schema({
 views: String


})

module.exports = mongoose.model('Views',views);