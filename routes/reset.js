var express = require('express');
var router = express.Router();
var Register = require("../models/register");
var Reset = require("../models/reset");
let { encryptPassword } = require('../utils/utils');
let { mailFunc } = require('../utils/mail');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/resetPassword', async (req, res) => {
   try{
       
      const email = await Register.findOne({ email: req.body.email })
      await mailFunc(req.body.email);
       if (email){
       console.log(email)
      const credentials =  await Reset(req.body).save()
       res.json({ message: "Registered Successfully", success: true })
      
       }else
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
   router.get('/resetData', async (req, res) => {
    try {
        const latestRecord = await Reset.findOne().sort({$natural : -1});
        const data = await Register.findOne({email : latestRecord.email})
        console.log(data)
        res.json({ message: "all Blogs sucess", data: data, success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
  });
   router.patch('/updateUserPassword/:id', async (req, res) => {
      let hashedPassword = await encryptPassword(req.body.confirm);
    req.body.password = hashedPassword;
   try {
     const user = await Register.findByIdAndUpdate(req.params.id,req.body).exec()
     
     if(user){
       res.json({message:"user successfully updated", data:user, success:true})
     }
     else{
       throw new Error;
     }
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
