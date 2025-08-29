const router = require("express").Router();
const {
    getAllPostsCtrl,
    newPostCtrl,
    getPostCtrl,
    updatePostCtrl,
    deletePostCtrl,
    countPostCtrl,
    toggleLikeCtrl,
    getAllNetPostsCtrl
} = require("../controllers/postController");
const { upload } = require("../middlewares/photoUpload");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/*===========================================*/

// /api/post/all
router.route("/all").get(getAllNetPostsCtrl);

/*===========================================*/

// /api/post
router.route("/")
    .get(getAllPostsCtrl)
    .post(verifyToken, upload.single("postImage"), newPostCtrl);

/*===========================================*/

// /api/post/count
router.route("/count").get(countPostCtrl);

/*===========================================*/

// /api/post/:id
router.route("/:id")
    .get(getPostCtrl)
    .put(validateObjectId, verifyToken, upload.single("postImage"), updatePostCtrl)
    .delete(verifyToken, deletePostCtrl);

/*===========================================*/

// /api/post/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;