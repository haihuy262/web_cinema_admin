var express = require("express");
var router = express.Router();
var discountController = require("../controller/discountController");
var authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/discountList",
  authMiddleware.requireLogin,
  discountController.discountList
);
router.get(
  "/discountAdd",
  authMiddleware.requireLogin,
  discountController.discountAdd
);
router.put(
  "/updateStatus/:id",
  authMiddleware.requireLogin,
  discountController.updateStatus
);

router.delete('/deleteDistcount/:id',  
  authMiddleware.requireLogin,
  discountController.deleteDistcount);
module.exports = router;
