var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboard.controller.js");
var authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/overview",
  authMiddleware.requireLogin,
  dashboardController.getOverview
);
router.get(
  "/movieList",
  authMiddleware.requireLogin,
  dashboardController.movieList
);
router.get(
  "/total",
  authMiddleware.requireLogin,
  dashboardController.total
);
router.get(
  "/totalCinema",
  authMiddleware.requireLogin,
  dashboardController.totalCinema
);
router.get(
  "/totalMovie",
  authMiddleware.requireLogin,
  dashboardController.totalMovie
);
router.get(
  "/totaListCinema",
  authMiddleware.requireLogin,
  dashboardController.totaListCinema
);
module.exports = router;
