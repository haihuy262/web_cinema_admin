var express = require("express");
var router = express.Router();
var ticketsController = require("../controller/tickets.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, ticketsController.listTickets);
router.get(
  "/details/:id",
  authMiddleware.requireLogin,
  ticketsController.detailsTickets
);

module.exports = router;
