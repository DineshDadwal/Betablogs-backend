var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var dashboard = mongoose.Schema({
  userId:String,
  title: String,
  categoryId: String,
  subCategoryId:String,
  Content: String,
  Upload: String,
  author:String,
  createdAt: Date,
 
 

})

module.exports = mongoose.model('Dashboard',dashboard);