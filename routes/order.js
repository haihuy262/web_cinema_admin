var express = require("express");
var router = express.Router();
var orderController = require("../controller/order.controller");

router.get("/list", orderController.listOrder);

module.exports = router;
