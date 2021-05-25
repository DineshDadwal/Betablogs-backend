var express = require('express');
var router = express.Router();
var dashboard = require('../models/dashboard');
let { encryptPassword, comparePassword, generateJwt, mailFunc } = require('../utils/utils');
router.get('/topic', function (req, res, next) {
   res.render('index', { title: 'Express' });
 });

//  coronavirus component injection
router.get('/getCoronavirusBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394e7413591832fc1237c9'}).exec()
      
      console.log(specificTopic)
      // const coronavirus = '60394e7413591832fc1237c9';
      // if(specificTopic === coronavirus){
         res.json({ message: "success", data: specificTopic, success: true }) 
        
      
      
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})


module.exports = router;