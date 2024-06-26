var express = require("express");
var router = express.Router();
var loginController = require("../controller/login.controller");

router.get("/login", loginController.login);

module.exports = router;
