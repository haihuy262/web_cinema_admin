var express = require("express");
var router = express.Router();
var cinemaController = require("../controller/cinemaController");

router.get("/cinemaList", cinemaController.cinemaList);
router.get("/cinemaAdd", cinemaController.cinemaAdd);
router.get("/roomList", cinemaController.roomList);
router.get("/roomAdd", cinemaController.roomAdd);
module.exports = router;