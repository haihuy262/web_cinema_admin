var express = require("express");
var router = express.Router();
var discountController = require("../controller/discountController");

router.get("/discountList", discountController.discountList);
router.get("/discountAdd", discountController.discountAdd);

module.exports = router;