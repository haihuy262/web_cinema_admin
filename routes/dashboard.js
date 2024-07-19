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
  "/getToken",
  authMiddleware.requireLogin,
  dashboardController.getToken
);

module.exports = router;
