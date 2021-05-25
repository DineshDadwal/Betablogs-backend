var express = require('express');
var router = express.Router();
var Dashboard = require('../models/dashboard')
var Admin = require('../models/admin');
let { encryptPassword, comparePassword, generateJwt } = require('../utils/utils');
/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
////////////// Register Forms//////////////

// router.post('/admin', async (req, res) => {
//   try {
//     // email check
//     const emailChk = await Admin.findOne({ email: req.body.email }).exec();
//     if (emailChk)
//       throw new Error('Email is already Registered');
// // phone check
   

//     let hashedPassword = await encryptPassword(req.body.password);
//     req.body.password = hashedPassword;

//     const newRegister = await new Admin(req.body).save();

//     if (newRegister)
//       res.json({ message: "Registered Successfully", success: true })
//     else
//       throw new Error('an err occured during registering')
//   }
//   catch (err) {
//     console.error(err);
//     if (err.message)
//       res.json({ message: err.message, data: err, success: false });

//     else
//       res.json({ message: 'error', data: err, success: false })
//   }

// })


// LOGIN 


router.post('/admin', async (req, res) => {
  try {
    const user = await  Admin.findOne({ email: req.body.email}).exec();
    if (user) {
      const passwordChk = await comparePassword(req.body.password, user.password)
      if (passwordChk) {
        const token = await generateJwt(user._id);
        res.json({ message: "successfully Logged in", data: token, success: true });
      }
      else {
        throw new Error('Check your credentials');
      }
    }
    else {
      throw new Error('Check your credentials');
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


router.patch('/updateUser/:id', async (req, res) => {
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
router.delete('/deleteBlog/:id', async (req, res) => {
  try {
    const user = await Dashboard.findByIdAndDelete(req.params.id).exec()
    if(user){
      res.json({message:"Blog deleted", data:user, success:true})
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
