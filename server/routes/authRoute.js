const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { upload } = require("../middlewares/photoUpload");

/*+++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++*/

// /api/auth/register
router.post("/register", upload.single("userImage"), register);

// /api/auth/login
router.post("/login", login);

module.exports = router;