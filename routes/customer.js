var express = require("express");
var router = express.Router();
var customerController = require("../controller/customer.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, customerController.listCustomer);
router.get("/history/:id", authMiddleware.requireLogin, customerController.history_tickets_user);

module.exports = router;
