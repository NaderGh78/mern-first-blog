const { Schema, model } = require("mongoose");
const joi = require("joi");

/*===========================================*/
/*===========================================*/
/*===========================================*/

//here we extract this collection as the modal
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    }
}, {
    timestamps: true
});

/*===========================================*/

// new customer validation func
function validationNewUser(obj) {

    const Schema = joi.object({
        name: joi.string().trim().min(3).max(200).required(),
        email: joi.string().trim().min(5).max(100).required().email(),
        age: joi.number().min(1).max(100).required()
    })

    return Schema.validate(obj);

}

/*===========================================*/

// update customer validation func
function validationUpdateUser(obj) {

    const Schema = joi.object({

        name: joi.string().trim().min(3).max(200),
        email: joi.string().trim().min(5).max(100).email(),
        age: joi.number().min(1).max(100)

    });

    return Schema.validate(obj);

}

/*===========================================*/

// create Customer model
const CustomerModel = model("Customer", CustomerSchema, "Customer");

module.exports = {
    CustomerModel,
    validationNewUser,
    validationUpdateUser
}; 