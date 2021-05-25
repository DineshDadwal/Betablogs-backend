var express = require('express');
var router = express.Router();

var Category = require('../models/category');

/* Add new categorys */
router.post('/addCategory', async (req, res) => {
    try {
        const checkCategory = await Category.findOne({name:{'$regex': req.body.name,$options:'i'}}).exec()
        if (checkCategory) {
            throw new Error("category already exists");
        }

        const newCategory = await new Category(req.body).save()
        if (newCategory) {
            res.json({ message: "Category added Sucessfully", success: true })
        }
        else {
            throw new Error("Category not added")
        }


    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
});


//////////////get all categorys
router.get('/getAllCategories', async (req, res) => {
    try {
        const allCategorys = await Category.find().exec();
        res.json({ message: "all categories sucess", data: allCategorys, success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
});

/* get Particular Category. */
router.get('/getSpecificCategory/:id', async (req, res) => {
    try {
        const getSpecificCategory = await Category.findById({ _id: req.params.id }).exec()
        res.json({ message: "route Working", data: getSpecificCategory, success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
});

/////////////////delete categorys
router.delete('/deleteSpecificCategory/:id', async (req, res) => {
    try {

        const categoryVar = await Category.findById({ _id: req.params.id }).exec()

        if (categoryVar) {
            await categoryVar.remove()
            res.json({ message: "deleted Sucessfully", success: true })
        }
        else {
            res.json(err)
        }

    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
})



/////////////////Update categorys
router.patch('/updateSpecificCategory/:id', async (req, res) => {
    try {

        const categoryUpdateVar = await Category.findById({ _id: req.params.id }).exec()

        if (req.body.name) {
            categoryUpdateVar.name = req.body.name;
        }
        categoryUpdateVar.save()
        res.json({ message: "updated Sucessfully", success: true })

    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
})


module.exports = router;