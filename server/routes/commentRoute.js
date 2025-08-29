const router = require("express").Router();
const {
    getAllCommentsCtrl,
    newCommentCtrl,
    getCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl
} = require("../controllers/commentController");
const { validateObjectId } = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/*+++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++*/

// /api/comment 
router.route("/")
    .get(getAllCommentsCtrl)
    .post(verifyToken, newCommentCtrl);

/*+++++++++++++++++++++++++++++++++++++++++++*/

// /api/comment/:id
router.route("/:id")
    .get(validateObjectId, verifyToken, getCommentCtrl)
    .put(validateObjectId, verifyToken, updateCommentCtrl)
    .delete(validateObjectId, verifyToken, deleteCommentCtrl);

module.exports = router;