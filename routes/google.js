var express = require('express');
var router = express.Router();

var Google = require('../models/google');
let { encryptPassword, comparePassword, generateJwt,mailFunc, otp } = require('../utils/utils');
/* GET home page. */
router.get('/google', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/google', async (req, res) => {
   try {
     // email check
     console.log(res.json)
     const emailChk = await Google.findOne({ Qt: req.body.email }).exec();
     if (emailChk){
      res.json({ message: "login Successfully", success: true })
     }
      const newRegister = await new Google(req.body).save();
      await mailFunc(req.body.Qt, req.body.eU, req.body.$R);
     if (newRegister)
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
module.exports = router;
