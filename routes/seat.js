var express = require("express");
var router = express.Router();
var seatController = require("../controller/seat.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, seatController.listSeat);
router.get("/add", authMiddleware.requireLogin, seatController.addSeat);

module.exports = router;
