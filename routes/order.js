var express = require("express");
var router = express.Router();
var orderController = require("../controller/order.controller");

router.get("/list", orderController.listOrder);
router.get("/details/:id", orderController.detailsOrder);

module.exports = router;
