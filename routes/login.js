var express = require("express");
var router = express.Router();
var loginController = require("../controller/login.controller");

router.get("/login", loginController.getLogin);
router.get("/logout", loginController.getLogout);

router.post("/login", loginController.postLogin);

module.exports = router;
