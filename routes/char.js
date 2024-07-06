var express = require("express");
var router = express.Router();
var charController = require("../controller/charController");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, charController.charList);

module.exports = router;
