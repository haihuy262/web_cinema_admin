var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboard.controller.js");

/* GET home page. */
router.get("/overview", dashboardController.getOverview);
router.get("/revenue_cinema", dashboardController.getRevenueCinema);
router.get("/revenue_movie", dashboardController.getRevenueMovie);

module.exports = router;
