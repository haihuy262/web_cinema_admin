var express = require("express");
var router = express.Router();
var cinemaController = require("../controller/cinemaController");
var authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/cinemaList",
  authMiddleware.requireLogin,
  cinemaController.cinemaList
);
router.get(
  "/cinemaAdd",
  authMiddleware.requireLogin,
  cinemaController.cinemaAdd
);
router.get("/roomList", authMiddleware.requireLogin, cinemaController.roomList);
router.get("/roomAdd", authMiddleware.requireLogin, cinemaController.roomAdd);
module.exports = router;
