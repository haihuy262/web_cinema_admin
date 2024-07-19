var express = require("express");
var router = express.Router();
var tokenController = require("../controller/token.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/getToken", authMiddleware.requireLogin, tokenController.getToken);

module.exports = router;
