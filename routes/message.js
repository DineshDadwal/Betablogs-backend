var express = require('express');
var router = express.Router();
var message = require("../models/message");

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });

 });

 router.post('/message', async (req, res) => {
   try{
     
     const newMessage = await new message(req.body).save();
     if (newMessage){
     res.json({ message: "sent Successfully", success: true })
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
 router.get('/getMessage', async(req, res, next)=> {
   try {
     const text = await message.find().exec();
     console.log(text)
     res.json({ message: "Registered Successfully", data: text, success: true })

 }
 catch (err) {
     if (err.message)
         res.json({ message: err.message, success: false })
     else
         res.json({ message: 'Error', success: false })
 }
 });
 module.exports = router;
 