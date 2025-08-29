const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const joi = require("joi");
const jwt = require('jsonwebtoken');

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UserSchema = new Schema({
    username: {
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
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    bio: {
        type: String,
        default: "hello",

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userImage: {
        // type: String,
        // required: false,
        // default: "user-avatar.png",
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
        },
        required: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

/*===========================================*/

// Populate Posts That Belongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
});

/*===========================================*/

// Generate Token
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
}

/*===========================================*/

// register user validation func
function registerValidation(obj) {

    const schema = joi.object({
        username: joi.string().trim().min(3).max(200).required(),
        email: joi.string().trim().min(5).max(100).email().required(),
        password: joi.string().trim().min(8).required(),
        bio: joi.string().optional(),
        isAdmin: joi.boolean(),
        // userImage: joi.object().allow("")
    });

    return schema.validate(obj);

}

/*===========================================*/

// login user validation func
function loginValidation(obj) {

    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email().required(),
        password: joi.string().trim().min(8).required()
    });

    return schema.validate(obj);

}

/*===========================================*/

// update user validation func
function updateUserValidation(obj) {

    const schema = joi.object({
        username: joi.string().trim().min(3).max(200),
        email: joi.string().trim().min(5).max(100).email(),
        password: joi.string().trim().min(8),
        bio: joi.string().optional(),
        userImage: joi.string().optional()

    });

    return schema.validate(obj);

}

/*===========================================*/

// create User model
const UserModel = model("User", UserSchema, "User");

module.exports = {
    UserModel,
    registerValidation,
    loginValidation,
    updateUserValidation
};