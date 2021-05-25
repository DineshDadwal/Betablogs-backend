var express = require('express');
var router = express.Router();
var Register = require('../models/register');
var login = require('../models/login');
let { encryptPassword, comparePassword, generateJwt, mailFunc } = require('../utils/utils');
const { route } = require('./admin');
/* GET home page. */
router.get('/login', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// LOGIN 


router.post('/login', async (req, res) => {
  try {
    const user = await Register.findOne({ email: req.body.email }).exec();
    if (user) {
      const passwordChk = await comparePassword(req.body.password, user.password)
      if (passwordChk) {
        const token = await generateJwt(user._id);
        const credential =  login(req.body).save();
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

router.get('/getLoginId', async (req, res) => {
  try {
      const latestLogin = await login.findOne().sort({$natural : -1}); // to find newest document entered
      console.log(latestLogin)
      const loginId = await Register.findOne({email: latestLogin.email})
      res.json({ message: "all categories sucess", data: loginId , success: true })
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
});
module.exports = router;