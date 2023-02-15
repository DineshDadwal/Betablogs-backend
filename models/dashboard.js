var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var dashboard = mongoose.Schema({
  title: String,
  categoryId: String,
  subCategoryId:String,
  Content: String,
  Upload: String,
  author:String,
  createdAt: String,
  userId:{type:'ObjectId',ref:'Register'},

 
 

})

module.exports = mongoose.model('Dashboard',dashboard);