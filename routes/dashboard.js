var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboard.controller.js");
var authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/overview",
  authMiddleware.requireLogin,
  dashboardController.getOverview
);

module.exports = router;
