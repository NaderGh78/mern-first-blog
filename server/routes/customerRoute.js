const router = require("express").Router();
const {
    getAllCustomersCtrl,
    newCustomerCtrl,
    getCustomerCtrl,
    updateCustomerCtrl,
    deleteCustomerCtrl,
    countCustomersCtrl
} = require("../controllers/cutomerController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/customer 
router.route("/")
    .get(verifyTokenAndAdmin, getAllCustomersCtrl)
    .post(verifyTokenAndAdmin, newCustomerCtrl);

/*===========================================*/

// /api/customer/count  
router.route("/count").get(verifyTokenAndAdmin, countCustomersCtrl);

/*===========================================*/

// /api/customer/:id
router.route("/:id")
    .get(verifyTokenAndAdmin, getCustomerCtrl)
    .put(verifyTokenAndAdmin, updateCustomerCtrl)
    .delete(verifyTokenAndAdmin, deleteCustomerCtrl);

module.exports = router;