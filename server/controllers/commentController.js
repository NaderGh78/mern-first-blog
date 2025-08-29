const asynHandler = require("express-async-handler");
const {
    CommentModel,
    newCommentValidation,
    updateCommentValidation
} = require("../models/CommentModel");
const { UserModel } = require("../models/UserModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 * @desc get all comment
 * @route /api/comment
 * @method Get
 * @access private (only admin) 
*/

const getAllCommentsCtrl = asynHandler(
    async (req, res) => {
        // 1. get all comments from db and populate user with desc sorting
        const comment = await CommentModel.find().populate("user").sort({ createdAt: -1 });
        res.status(200).json(comment);
    }
);

/*===========================================*/

/**
 * @desc create new comment
 * @route /api/comment
 * @method Post
 * @access private (only logged user) 
*/

const newCommentCtrl = asynHandler(
    async (req, res) => {
        // 1. validation
        const { error } = newCommentValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. check if there are looged user,in order to get his data
        // const profile = await UserModel.findById(req.userDecoded.id);

        // 3. create new comment
        const comment = await CommentModel.create({
            postId: req.body.postId,
            text: req.body.text,
            user: req.userDecoded.id,
            // username: profile.username,
            // userImage: profile.userImage
        });


        if (comment._id) {
            const result = await CommentModel.findById({ _id: comment._id }).populate("user", ["-password"]);
            // 4. send response to client
            res.status(201).json(result);
        }


    }
);

/*===========================================*/

/**
 * @desc get comment
 * @route /api/comment/:id
 * @method Get
 * @access private (only owner of the comment and admin) 
*/

const getCommentCtrl = asynHandler(
    async (req, res) => {

        // 1. get single comment 
        const comment = await CommentModel.findById(req.params.id);

        /*
         2. check if the user logged or the user is admin,and check if this comment belongs to them by they id,
          in order to get his comment,otherwise forbiden msg
        */
        if (req.userDecoded.isAdmin || req.userDecoded.id === comment.user.toString()) {
            await CommentModel.findById(req.params.id);
            res.status(200).json(comment);
        } else {
            res.status(403).json({ message: "access denied, not allowed" });
        }
    }
);

/*===========================================*/

/**
 * @desc update comment
 * @route /api/comment/:id
 * @method Put
 * @access private (only owner of the comment)
*/

const updateCommentCtrl = asynHandler(
    async (req, res) => {
        // 1. validation
        const { error } = updateCommentValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. check if the comment in db,otherwise comment not found
        const comment = await CommentModel.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }

        // 3. check if this comment NOT belongs to this looged user,otherwise forbiden msg
        if (req.userDecoded.id !== comment.user.toString()) {
            return res.status(403)
                .json({ message: "access denied, only user himself can edit his comment" });
        }

        // 4. update comment
        const updatedComment = await CommentModel.findByIdAndUpdate(req.params.id, {
            $set: {
                text: req.body.text,
            }
        }, { new: true });

        if (comment._id) {
            const result = await CommentModel.findById({ _id: comment._id }).populate("user", ["-password"]);
            // 4. send response to client
            res.status(200).json(result);
        }

    }
);

/*===========================================*/

/**
 * @desc delete comment
 * @route /api/comment/:id
 * @method Delete
 * @access private (only owner of the comment and admin) 
*/

const deleteCommentCtrl = asynHandler(
    async (req, res) => {

        // 1. get the category from db
        const comment = await CommentModel.findById(req.params.id);

        // 2. check if this comment belongs for this looged user or admin with success msg , otherwise forbiden msg
        if (req.userDecoded.isAdmin || req.userDecoded.id === comment.user.toString()) {
            await CommentModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "comment has been deleted" });
        } else {
            res.status(403).json({ message: "access denied, not allowed" });
        }
    }
);

module.exports = {
    getAllCommentsCtrl,
    newCommentCtrl,
    getCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl
}