var express = require("express");
var router = express.Router();
var employeeController = require("../controller/employee.controller");

router.get("/list", employeeController.listEmployee);
router.get("/add", employeeController.addEmployee);

module.exports = router;
