var express = require("express");
var router = express.Router();
var serviceController = require("../controller/serviceController");

router.get("/serviceList", serviceController.serviceList);
router.get("/serviceAdd", serviceController.serviceAdd);

module.exports = router;