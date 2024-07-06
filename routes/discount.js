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

module.exports = router;
