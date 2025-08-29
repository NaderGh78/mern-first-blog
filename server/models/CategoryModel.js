const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const joi = require("joi");

/*===========================================*/
/*===========================================*/
/*===========================================*/

const categoryShema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 200,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

/*===========================================*/

// new category validation func
function newCategoryValidate(obj) {

    const shema = joi.object({

        title: joi.string().trim().min(2).max(200).required().label("Title")

    });

    return shema.validate(obj);

}

/*===========================================*/

// update category validation func
function updateCategoryValidate(obj) {

    const shema = joi.object({

        title: joi.string().trim().min(2).max(200)

    });

    return shema.validate(obj);

}

/*===========================================*/

// create Category model
const CategoryModel = model("Category", categoryShema, "Category");

module.exports = {
    CategoryModel,
    newCategoryValidate,
    updateCategoryValidate
}