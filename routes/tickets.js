var express = require("express");
var router = express.Router();
var ticketsController = require("../controller/tickets.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, ticketsController.listOrder);
router.get(
  "/details/:id",
  authMiddleware.requireLogin,
  ticketsController.detailsOrder
);

module.exports = router;
