var express = require('express');
var router = express.Router();

var SubCategory = require('../models/subcategory');
var Category = require('../models/category');

/* Add new subCategoryes */
router.post('/addSubCategory', async (req, res) => {
    try {
        const checkSubCategory = await SubCategory.findOne({ name: req.body.name }).exec()
        if (checkSubCategory) {
            throw new Error("subCategory already exists");
        }
        else {
            const newSubCategory = await new SubCategory(req.body).save()
            if (newSubCategory) {
                res.json({ message: "SubCategory added Sucessfully" })
            }
            else {
                throw new Error("SubCategory not added")
            }

        }
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
});


//////////////get all subCategoryes
router.get('/getAllSubCategorys', async (req, res) => {
    try {
        /////////////////////lean is used to modify the array 
        const allSubCategoryes = await SubCategory.find().lean().exec();
        for (let obj of allSubCategoryes) {
            let category = await Category.findById(obj.categoryId).exec();
            obj.categoryName = category.name;
        }
        res.json({ message: "all subCategoryes sucess", data: allSubCategoryes, success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
});

/* get Particular SubCategory. */
router.get('/getSpecificSubCategory/:id', async (req, res) => {
    try {
        const getSpecificSubCategory = await SubCategory.findById({ _id: req.params.id }).exec()
        res.json({ message: "route Working", data: getSpecificSubCategory, success: true })
    }
    catch (err) {
        if (err.message)
            res.json({ message: err.message, success: false })
        else
            res.json({ message: 'Error', success: false })
    }
});

/////////////////delete subCategoryes
router.delete('/deleteSpecificSubCategory/:id', async (req, res) => {
    try {

        const subCategoryVar = await SubCategory.findById({ _id: req.params.id }).exec()

        if (subCategoryVar) {
            await subCategoryVar.remove()
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



/////////////////Update subCategoryes
router.patch('/updateSpecificSubCategory/:id', async (req, res) => {
    try {

        const subCategoryUpdateVar = await SubCategory.findByIdAndUpdate(req.params.id, req.body).exec()
        console.log(req.body, subCategoryUpdateVar)
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