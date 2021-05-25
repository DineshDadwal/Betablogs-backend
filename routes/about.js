var express = require('express');
var router = express.Router();
var views= require('../models/views');
var About = require('../models/about');
let { encryptPassword, comparePassword, generateJwt } = require('../utils/utils');
/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/about', async (req, res) => {
   
try{
   const aboutInfo = await new About(req.body).save();
   if (aboutInfo)
   res.json({ message: "Registered Successfully", success: true })
 else
   throw new Error('an err occured during registering')
}
catch (err) {
   console.error(err);
   if (err.message)
     res.json({ message: err.message, data: err, success: false });

   else
     res.json({ message: 'error', data: err, success: false })
 }

});
router.post('/views', async (req, res) => {
   
  try{
     const view = await new views(req.body).save();
     if (view)
     res.json({ message: "Registered Successfully", success: true })
   else
     throw new Error('an err occured during registering')
  }
  catch (err) {
     console.error(err);
     if (err.message)
       res.json({ message: err.message, data: err, success: false });
  
     else
       res.json({ message: 'error', data: err, success: false })
   }
  
  })
  router.get('/viewCount', async (req, res) => {
    try {
        const viewCount = await views.collection.count(); // to find newest document entered
        console.log(viewCount)
        
        res.json({ message: "all categories sucess", data: viewCount , success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
  });


module.exports = router;