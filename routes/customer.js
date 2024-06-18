var express = require("express");
var router = express.Router();
var customerController = require("../controller/customer.controller");

router.get("/list", customerController.listCustomer);

module.exports = router;
