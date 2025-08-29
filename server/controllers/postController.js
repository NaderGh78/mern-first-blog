const asynHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
const {
    PostModal,
    newPostValidation,
    updatePostValidation
} = require("../models/PostModal");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 * @desc get all net posts
 * @route /api/post/all
 * @method Get
 * @access public 
*/

const getAllNetPostsCtrl = asynHandler(

    async (req, res) => {

        let posts = await PostModal.find().sort({ createdAt: -1 }).populate("user", "_id username");

        res.status(200).json({ data: posts });

    }

);

/*===========================================*/

/**
 * @desc get all posts
 * @route /api/post
 * @method Get
 * @access private (only logged user and admin) 
*/

const getAllPostsCtrl = asynHandler(
    async (req, res) => {
        // 1. 6 posts per page
        const POST_PER_PAGE = 6;
        // 2. distructing the query that need
        const { pageNumber, category } = req.query;

        let posts;

        /*
        3. when the client give page number, do the following
        a- get 6 posts and sorting its and populate the [users and comment] with posts
        b- if the client give category ,get the categories and sort its and populate the [users] 
        c- if no [page number or category] provided ,,,,,,,, show all the posts and populate the [users] 
        */
        if (pageNumber) {
            posts = await PostModal.find()
                .skip((pageNumber - 1) * POST_PER_PAGE)
                .limit(POST_PER_PAGE)
                .sort({ createdAt: -1 })
                .populate("user", ["-password"]).populate("comments");
        } else if (category) {
            posts = await PostModal.find({ category })
                .sort({ createdAt: -1 })
                .populate("user", ["-password"]).populate("comments");
        } else {
            posts = await PostModal.find()
                .sort({ createdAt: -1 })
                .populate("user", ["-password"]).populate("comments");
        }

        // 4. send response to client
        res.status(200).json(posts);
    }
);

/*===========================================*/

/**
 * @desc add new post
 * @route /api/post
 * @method Post
 * @access private (only logged user and admin) 
*/

const newPostCtrl = asynHandler(

    async (req, res) => {

        const { title, category, description } = req.body;

        // 1. validation
        const { error } = newPostValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. get post with same title
        let post = await PostModal.findOne({ title: req.body.title });

        // 3. show error msg in case the post title already exists
        if (post) {
            return res.status(400).json({ message: "Post Title Already Exist." });
        }

        // 4. Upload photo 
        let result;
        let imagePath;

        if (req.file) {
            imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
            result = await cloudinary.cloudinaryUploadImage(imagePath, "my-blog/posts");
        }

        post = await PostModal.create({
            title,
            category,
            description,
            user: req.userDecoded.id,
            postImage: req.file && req.file.originalname
                ? { url: result.secure_url, publicId: result.public_id }
                : { url: "http://localhost:3001/uploads/no-picture.jpg", publicId: null }
        });

        res.status(201).json({ message: "Post Created Successfully", post, success: true });

        if (imagePath) {
            fs.unlinkSync(imagePath);
        }

    }

);

/*===========================================*/

/**
 * @desc get post
 * @route /api/post/:id
 * @method Get
 * @access private (only logged user and admin)  
*/
const getPostCtrl = asynHandler(
    async (req, res) => {

        // 1. get single post with id , and populate [user and comments]
        // const post = await PostModal.findById(req.params.id).populate("user", ["-password"]).populate("comments");

        const post = await PostModal.findById(req.params.id).populate("user", ["-password"]).populate({
            path: "comments",
            populate: {
                path: "user",
                select: "_id username userImage"
            }
        });

        // 2. check if post exist show it , otherwise show not found post
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post Not Found." });
        }
    }
);

/*===========================================*/

/**
 * @desc update post 
 * @route /api/post/:id
 * @method Put
 * @access private (only logged user and admin)
*/
const updatePostCtrl = asynHandler(

    async (req, res) => {

        const { title, category, description } = req.body;

        // 1. validation
        const { error } = updatePostValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. check if the post exists with his id 
        let post = await PostModal.findById(req.params.id);

        // 3. if no post exists , show post not found msg
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        // 4. check if the post not belongs for user
        if (req.userDecoded.id !== post.user.toString()) {
            return res
                .status(403)
                .json({ message: "access denied, you are not allowed" });
        }

        /*
        5.
        when user create post WITOUT IMAGE ,by default showing a default image, as we put in [post model],
        BUT the default post image it [publicId] is null, to remove image from cloudinary need [publicId]
        when the user need to update the image from the [default image showing] to another chosen post image,
        the cloudinary will not see any [publicId] for post image,therfore we check if the post image has [publicId]
        in order to change the image 
        */

        // if (post?.postImage?.publicId) {
        //     await cloudinary.uploader.destroy(post.postImage.publicId);
        // }


        if (post?.postImage?.publicId) {
            await cloudinary.cloudinaryRemoveImage(post.postImage.publicId);
        }

        // 6. after remove the old image , upload new image to cloudinary  
        let result;
        let imagePath;

        // if (req.file) {

        //     imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
        //     result = await cloudinary.uploader.upload(imagePath, { folder: "my-blog/posts" });
        // }


        if (req.file) {
            imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
            result = await cloudinary.cloudinaryUploadImage(imagePath, "my-blog/posts");
        }



        const data = {
            title: title || post.title,
            category: category || post.category,
            description: description || post.description,
            // in case the user dont want to update the post image
            postImage:
                req.file && req.file.originalname ?
                    { url: result.secure_url, publicId: result.public_id } :
                    undefined
        };

        // 7. update the post,and populate [user] without password
        const updatePost = await PostModal.findByIdAndUpdate(
            req.params.id, data, { new: true }
        ).populate("user", ["-password"]);

        // 8. send response to client
        res.status(200).json(updatePost);

        // 9. Remvoe image from the server
        fs.unlinkSync(imagePath);

    });

/*===========================================*/

/**
 * @desc delete post 
 * @route /api/post/:id
 * @method Delete
 * @access private (only logged user and admin) 
*/
const deletePostCtrl = asynHandler(
    async (req, res) => {
        // 1. check if there is post with provided id 
        const post = await PostModal.findById(req.params.id);

        // 2. if the post exists delete it with success msg, otherwise show post not found msg
        if (post) {

            //retrieve current image ID
            const imgId = post.postImage.publicId;

            if (imgId) {
                // await cloudinary.uploader.destroy(imgId);
                await cloudinary.cloudinaryRemoveImage(imgId);
            }

            await PostModal.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: "Post Deleted Successfully.", success: true });

        } else {
            res.status(404).json({ message: "Post Not Found.", success: false });
        }
    }
);

/*===========================================*/

/**
 *@desc get count posts
 *@route /api/post/count
 *@method Get
 *@access private (only admin) 
*/

const countPostCtrl = asynHandler(
    async (req, res) => {
        // get posts count
        const count = await PostModal.countDocuments();
        res.status(200).json(count);
    }
);

/*===========================================*/

/**
 *@desc toggle like
 *@route /api/post/like/:id
 *@method Put
 *@access private (only logged in user) 
*/

const toggleLikeCtrl = asynHandler(
    async (req, res) => {
        // 1. get logged user 
        const loggedInUser = req.userDecoded.id;

        // 2. distructring id from params,and change it name to [id]
        const { id: postId } = req.params;

        // 3. check if the post already exists,otheriwse show post not found msg
        let post = await PostModal.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        // 4. check if the user id is inside the [likes array],that mean that the user already like the post
        const isPostAlreadyLiked = post.likes.find(
            (user) => user.toString() === loggedInUser
        );

        // 5.  if the user already like the post , pull it from [likes array]
        if (isPostAlreadyLiked) {
            post = await PostModal.findByIdAndUpdate(
                postId,
                {
                    // remove the loggedInUser from [likes arr]
                    $pull: { likes: loggedInUser },
                },
                { new: true }
            );
        } else {
            // if the user not like the post , push it id to [likes array],here the user like the post
            post = await PostModal.findByIdAndUpdate(
                postId,
                {
                    $push: { likes: loggedInUser },
                },
                { new: true }
            );
        }

        // 6. send response to client
        res.status(200).json(post);
    }
);

module.exports = {
    getAllNetPostsCtrl,
    getAllPostsCtrl,
    newPostCtrl,
    getPostCtrl,
    updatePostCtrl,
    deletePostCtrl,
    countPostCtrl,
    toggleLikeCtrl
}