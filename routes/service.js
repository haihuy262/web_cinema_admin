var express = require("express");
var router = express.Router();
var serviceController = require("../controller/serviceController");
var authMiddleware = require("../middleware/authMiddleware");
var multer = require("multer");
var uploadImage = multer({ dest: "./tmp" });
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
router.post(
  "/createFood",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  serviceController.createFood
);

module.exports = router;
