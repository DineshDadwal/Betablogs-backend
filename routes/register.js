var express = require('express');
var router = express.Router();

var Register = require('../models/register');
let { encryptPassword, comparePassword, generateJwt,mailFunc, otp,mailFuncWelcome } = require('../utils/utils');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },filename: function(req, file, cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage: storage})
/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
////////////// Register Forms//////////////

router.post('/register', async (req, res) => {
  try {
    // email check
    const emailChk = await Register.findOne({ email: req.body.email }).exec();
    if (emailChk)
      throw new Error('Email is already Registered');
// phone check
    // const phoneChk = await Register.findOne({ phone: req.body.phone }).exec();
    // if (phoneChk)
    //   throw new Error('Phone number is already Registered');
      
    // const emailConfirm = await compare(req.body.otpCheck, emailConfirm.otp).exec();
    
    // if(emailConfirm){
    // res.json({ message: "Email Confirmed Succesfully", success: true });
    // }
    // else{
    //   throw new Error('Invalid Otp');
    // }
    let hashedPassword = await encryptPassword(req.body.confirm);
    req.body.password = hashedPassword;
    // mailfunction
    
    const newRegister = await new Register(req.body).save();
    await mailFuncWelcome(req.body.email, req.body.firstName, req.body.lastName);
    // mail send to the user
    // const newRegister = await new Register(req.body).save();

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

// ChecK New User Email

router.post('/checkUser', async (req, res) => {
  try {
    // email check
    console.log(req.body.email)
    const emailChk = await Register.findOne({ email: req.body.email }).exec();
    if (!emailChk){
    await mailFunc(req.body.email, req.body.firstName, req.body.lastName);
    res.json({ message: "User doesn't Exist", success: true })
    }else{
      res.json({ message: "User Exist", success: false });
    }
    // mail send to the user
    // const newRegister = await new Register(req.body).save();

  }
  catch (err) {
    console.error(err);
    if (err.message)
      res.json({ message: err.message, data: err, success: false });

    else
      res.json({ message: 'error', data: err, success: false })
  }

})

router.post('/picture',upload.single('Upload'), async (req, res, next) => {
  const Upload = req.file
 console.log(file.filename);
 if(!Upload){
     const error = new Error('No file')
     error.httpStatusCode = 400
     return next(error)
 }else{
     res.httpStatusCode = 200
 }
 res.send(Upload)
})

// LOGIN 


// router.post('/login', async (req, res) => {
//   try {
//     const user = await  User.findOne({ email: req.body.email}).exec();
//     if (user) {
//       const passwordChk = await comparePassword(req.body.password, user.password)
//       if (passwordChk) {
//         const token = await generateJwt(user._id);
//         res.json({ message: "successfully Logged in", data: token, success: true });
//       }
//       else {
//         throw new Error('Check your credentials');
//       }
//     }
//     else {
//       throw new Error('Check your credentials');
//     }
//   }
//   catch (err) {
//     console.error(err);
//     if (err.message)
//       res.json({ message: err.message, data: err, success: false });

//     else
//       res.json({ message: 'error', data: err, success: false })
//   }
// })

router.get('/getCount', async (req, res) => {
  try {
      const count = await Register.collection.count();
      
      res.json({ message: "all Blogs sucess", data: count, success: true })
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
});
router.get('/getMenCount', async (req, res) => {
  try {
      const maleGender = await Register.find( {gender: 'Male'}).count();
      const femaleGender = await Register.find( {gender: 'Female'}).count()
      
      
         res.json({ message: "success", male: maleGender, female: femaleGender, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

router.get('/getOtp', async (req, res) => {
  try {
      const OTP = await otp;
      console.log(OTP)
      res.json({ message: "all Blogs sucess", data: OTP, success: true })
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
});

router.get('/user/:email', async (req, res) => {
  try {
    const email=req.params.email
    const emailChk = await Register.findOne({ email: email }).populate('blogs').exec();
      res.json({ message: "all Blogs sucess", data: emailChk, success: true })
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
});

// Add blog ID
router.put('/updateBlog/:id/:blogs', async (req, res) => {
 
  try {
   console.log(req.params.blogs)
    const user = await Register.findByIdAndUpdate({_id : req.params.id},{$push:{blogs : req.params.blogs}}).exec()
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
