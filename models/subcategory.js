var mongoose = require('mongoose');
var subCategory = mongoose.Schema({
    name:String,
    categoryId:String
});

module.exports= mongoose.model('SubCategory',subCategory);
