const router = require("express").Router();
const { upload } = require("../middlewares/photoUpload");
const {
    getAllUsersCtrl,
    getUserCtrl,
    deleteUserCtrl,
    updateUserCtrl,
    getUsersCountCtrl,
    deleteUserProfileCtrl
} = require("../controllers/userController");
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");

/*===========================================*/
/*===========================================*/
/*===========================================*/

//  /api/users/profile
router.route("/profile").get(getAllUsersCtrl);

/*===========================================*/

// /api/users/profile/:id
router.route("/profile/:id")
    .get(getUserCtrl)
    .put(verifyToken, upload.single("userImage"), updateUserCtrl)
    .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);

/*===========================================*/

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;