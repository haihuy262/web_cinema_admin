var express = require("express");
var router = express.Router();
var orderController = require("../controller/order.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, orderController.listOrder);
router.get(
  "/details/:id",
  authMiddleware.requireLogin,
  orderController.detailsOrder
);

module.exports = router;
