const router = require("express").Router();
const {
    allCategoriesCtrl,
    newCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
    countCategoryCtrl
} = require("../controllers/categoryController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");

/*+++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++*/

// /api/categories 
router.route("/")
    .get(allCategoriesCtrl)
    .post(verifyTokenAndAdmin, newCategoryCtrl);

/*=========================================*/

// /api/categories/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateCategoryCtrl)
    .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

/*=========================================*/
// get category count
router.route("/count").get(countCategoryCtrl);

module.exports = router;