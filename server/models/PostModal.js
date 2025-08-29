const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const joi = require("joi");

/*===========================================*/
/*===========================================*/
/*===========================================*/

PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    category: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postImage: {
        type: Object,
        default: {
            url: `${process.env.BACKEND_URL}/uploads/no-picture.jpg`,
            publicId: null
        }
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

/*===========================================*/

//Populate Comment For This Post
PostSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id"
});

/*===========================================*/

// new post validation func
function newPostValidation(obj) {

    const shema = joi.object({
        title: joi.string().trim().min(5).max(100).required(),
        category: joi.string().trim().min(2).max(100).required(),
        description: joi.string().trim().min(5).required()
    });

    return shema.validate(obj);

}

/*===========================================*/

// update post validation func
function updatePostValidation(obj) {

    const shema = joi.object({

        title: joi.string().trim().min(5).max(100),
        category: joi.string().trim().min(2).max(100),
        description: joi.string().trim().min(5),
        postImage: joi.string()

    });

    return shema.validate(obj);

}

/*===========================================*/

// create Post model
const PostModal = model("Post", PostSchema, "Post");

module.exports = {
    PostModal,
    newPostValidation,
    updatePostValidation
} 