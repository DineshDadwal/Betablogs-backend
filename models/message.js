var mongoose = require('mongoose');
var message = mongoose.Schema({
 name:{
    type: String, 
    require: true
 },
 message:{
    type: String,
    require:true
 },
 createdAt:Date
})

module.exports = mongoose.model('Message',message);