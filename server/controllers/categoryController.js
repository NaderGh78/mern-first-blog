const asynHandler = require("express-async-handler");
const joi = require("joi");
const {
    CategoryModel,
    newCategoryValidate,
    updateCategoryValidate } = require("../models/CategoryModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 *@desc Get all categories
 *@route /api/categories
 *@method Get
 *@access public  
*/

const allCategoriesCtrl = asynHandler(
    async (req, res) => {
        // 1. get all categories from db
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    }
);

/*===========================================*/

/**
 *@desc add new category
 *@route /api/categories
 *@method Post
 *@access private (admin only) 
*/

const newCategoryCtrl = asynHandler(
    async (req, res) => {

        // 1. validation
        const { error } = newCategoryValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. get single category with same title from db
        let category = await CategoryModel.findOne({ title: req.body.title });

        // 3. return msg in case the category exists
        if (category) {
            return res.status(404).json({ message: "category already exist" });
        }

        // 4. if category not exists in db , create it
        category = await CategoryModel.create({
            title: req.body.title
        });

        // 5. send response to client
        res.status(201).json(category);
    }
);

/*===========================================*/

/**
 *@desc update category
 *@route /api/categories/:id
 *@method Put
 *@access private (admin only) 
*/

const updateCategoryCtrl = asynHandler(
    async (req, res) => {

        // 1. validation
        const { error } = updateCategoryValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. update the category
        const category = await CategoryModel.findByIdAndUpdate(
            req.params.id, {
            $set: {
                title: req.body.title
            }
        }, { new: true });

        // 3. send response to client
        res.status(200).json({ message: "categorie update" })
    }
);

/*===========================================*/

/**
 *@desc delete category
 *@route /api/categories/:id
 *@method Delete
 *@access private (admin only) 
*/

const deleteCategoryCtrl = asynHandler(
    async (req, res) => {

        // 1. get the category from db
        const category = await CategoryModel.findById(req.params.id);

        // 2. find the category and delete it,otherwise return msg the category not fond
        if (category) {
            await CategoryModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "category has been deleted successfully",
                categoryId: category._id,
            });
        } else {
            res.status(404).json({ message: "category not found" });
        }
    }
);

/*===========================================*/

/**
 *@desc get count category
 *@route /api/categories/count
 *@method Get
 *@access public  
*/

const countCategoryCtrl = asynHandler(
    async (req, res) => {
        // get the count of the categories
        const count = await CategoryModel.countDocuments();
        res.status(200).json(count);
    }
);

module.exports = {
    allCategoriesCtrl,
    newCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
    countCategoryCtrl
}