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
router.put(
  "/updateRoom/:id",
  authMiddleware.requireLogin,
  cinemaController.updateRoom
);

router.get("/roomList", authMiddleware.requireLogin, cinemaController.roomList);
router.get("/roomAdd", authMiddleware.requireLogin, cinemaController.roomAdd);
router.post(
  "/creatCinema",
  authMiddleware.requireLogin,
  cinemaController.creatCinema
);

router.delete(
  "/deleteRoom/:id",
  authMiddleware.requireLogin,
  cinemaController.deleteRoom
);
router.put(
  "/updateCinema/:id",
  authMiddleware.requireLogin,
  cinemaController.updateCinema
);
router.delete(
  "/cinema/:id",
  authMiddleware.requireLogin,
  cinemaController.deleteCinema
);
module.exports = router;
