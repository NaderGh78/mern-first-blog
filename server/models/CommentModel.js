const { Schema, model } = require("mongoose");
const joi = require("joi");

/*===========================================*/
/*===========================================*/
/*===========================================*/

const CommentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

/*===========================================*/

// new comment validation func
function newCommentValidation(obj) {

    const schema = joi.object({

        postId: joi.string().required().label("Post ID"),
        text: joi.string().trim().required().label("Comment Field")

    });

    return schema.validate(obj);

}

/*===========================================*/

// update comment validation func
function updateCommentValidation(obj) {

    const schema = joi.object({
        text: joi.string().trim().required().label("Text")
    });

    return schema.validate(obj);

}

/*===========================================*/

// create Comment model
const CommentModel = model("Comment", CommentSchema, "Comment");

module.exports = {
    CommentModel,
    newCommentValidation,
    updateCommentValidation
}