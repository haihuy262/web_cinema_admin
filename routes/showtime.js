var express = require("express");
var router = express.Router();
var showtimeController = require("../controller/showtime.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/add/time", authMiddleware.requireLogin, showtimeController.getCreateTime);
router.get("/add/showtime", authMiddleware.requireLogin, showtimeController.getCreateShowtime);
router.get("/list/showtime", authMiddleware.requireLogin, showtimeController.getListShowtime);

module.exports = router;
