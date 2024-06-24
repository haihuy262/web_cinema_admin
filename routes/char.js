var express = require("express");
var router = express.Router();
var charController = require("../controller/charController");

router.get("/list", charController.charList);

module.exports = router;