var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
const dir = './uploads/';
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },filename: function(req, file, cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage: storage})

var dashboard = require('../models/dashboard');
let { encryptPassword, comparePassword, generateJwt, mailFunc } = require('../utils/utils');

router.post('/file',upload.single('Upload'), async (req, res, next) => {
  try{
    const Upload = req.file
    console.log(Upload);
    if(!Upload){
        const error = new Error('No file')
        error.httpStatusCode = 400
        return next(error)
    }else{
        // res.httpStatusCode = 200
    res.json({ message: "Upload success", data: Upload, success: true });

    }
    // res.send(Upload)
  }catch(err){
    console.error(err);
    if (err.message)
      res.json({ message: err.message, data: err, success: false });

    else
      res.json({ message: 'error', data: err, success: false })
  }
 
})

router.post('/dashboard', async (req, res) => {
//   req.file
//  console.log(file.filename);
//  if(!req.file){
//      const error = new Error('No file')
//      error.httpStatusCode = 400
//      return next(error)
//  }else{
//      res.httpStatusCode = 200
//  }
//  res.send(req.file)

try{
    
    const newBlog = await new dashboard(
        {
        title: req.body.title,
        categoryId: req.body.categoryId,
        subCategoryId:req.body.subCategoryId,
        Content: req.body.Content,
        Upload: req.body.Upload,
        author:req.body.author,
        createdAt: req.body.createdAt,
        userId:req.body.userId
    }
    ).save();
    if (newBlog){
    console.log(newBlog)
    res.json({ message: "Registered Successfully", success: true, data : newBlog })
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



//////////////get all Blogs
router.get('/getAllBlogs', async (req, res) => {
  try {
      const allBlogs = await dashboard.find().sort({$natural : -1}).populate('userId').exec();
      res.json({ message: "all Blogs sucess", data: allBlogs, success: true })
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
});
router.get('/getCount', async (req, res) => {
    try {
        const count = await dashboard.collection.count();
        console.log(count)
        res.json({ message: "all Blogs sucess", data: count, success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
  });


  router.get('/getSpecificBlog/:id', async (req, res) => {
    try {
      const specificBlog = await dashboard.findById(req.params.id,req.body).populate('userId').exec()
      if(specificBlog){
        res.json({message:"user data", data:specificBlog, success:true})
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
// coronavirus component injection

router.get('/getCoronavirusBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394e7413591832fc1237c9'}).populate('userId').exec()
      
      console.log(specificTopic)
         res.json({ message: "success", data: specificTopic, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

// news component injection

router.get('/getNewsBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394e8613591832fc1237ca'}).populate('userId').exec()
      
      console.log(specificTopic)
         res.json({ message: "success", data: specificTopic, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})


// Entertainment component Injection


router.get('/getEntertainmentBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394e9313591832fc1237cb'}).populate('userId').exec()
      
      console.log(specificTopic)
         res.json({ message: "success", data: specificTopic, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

// Politics Component Injection
router.get('/getPoliticsBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394e9b13591832fc1237cc'}).populate('userId').exec()
      
      console.log(specificTopic)
         res.json({ message: "success", data: specificTopic, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

// Sports Component Injection

router.get('/getSportsBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394ea313591832fc1237cd'}).populate('userId').exec()
      
      console.log(specificTopic)
         res.json({ message: "success", data: specificTopic, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

// Technology Component Injection
router.get('/getTechnologyBlogs', async (req, res) => {
  try {
      const specificTopic = await dashboard.find( {categoryId : '60394ead13591832fc1237ce'}).populate('userId').exec()
      
      console.log(specificTopic)
         res.json({ message: "success", data: specificTopic, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

router.get('/imageCount', async (req, res) => {
  try {
    const length = fs.readdirSync(dir).length
    res.json({ message: "success", data: length, success: true }) 
  }
  catch (err) {
      if (err.message)
          res.json({ message: err.message, success: false })
      else
          res.json({ message: 'Error', success: false })
  }
})

router.get('/getBlogStats', async (req, res) => {
    try {
        const Technology = await dashboard.find( {categoryId : '60394ead13591832fc1237ce'}).count();
        const Sports = await dashboard.find( {categoryId : '60394ea313591832fc1237cd'}).count();
        const Politics = await dashboard.find( {categoryId : '60394e9b13591832fc1237cc'}).count();
        const Entertainment = await dashboard.find( {categoryId : '60394e9313591832fc1237cb'}).count();
        const News = await dashboard.find( {categoryId : '60394e8613591832fc1237ca'}).count();
        const Coronavirus = await dashboard.find( {categoryId : '60394e7413591832fc1237c9'}).count();

           res.json({ message: "success", tech: Technology,sports: Sports,politics: Politics,entertainment: Entertainment,news: News,corona: Coronavirus,  success: true }) 
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
  })
 
module.exports = router;