var express = require("express");
var router = express.Router();
var serviceController = require("../controller/serviceController");
var authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/serviceList",
  authMiddleware.requireLogin,
  serviceController.serviceList
);
router.get(
  "/serviceAdd",
  authMiddleware.requireLogin,
  serviceController.serviceAdd
);

module.exports = router;
