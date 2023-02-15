var express = require('express');
var router = express.Router();
var Register = require('../models/register');
/* GET home page. */
router.get('/userDataTable', function (req, res, next) {
   res.render('index', { title: 'Express' });
 });
 
 router.get('/getUser', async (req, res) => {
   try {
     const user = await Register.find().populate('blogs').exec()
     if(user){
       res.json({message:"user data", data:user, success:true})
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
 
 
 router.delete('/deleteUser/:id', async (req, res) => {
   try {
     const user = await Register.findByIdAndDelete(req.params.id).exec()
     if(user){
       res.json({message:"user deleted", data:user, success:true})
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
 
 
 router.get('/getSpecificUser/:id', async (req, res) => {
   try {
     const user = await Register.findById(req.params.id,req.body).exec()
     if(user){
       res.json({message:"user data", data:user, success:true})
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
