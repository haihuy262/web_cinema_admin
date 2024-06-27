var express = require("express");
var router = express.Router();
var employeeController = require("../controller/employee.controller");
var authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/list",
  authMiddleware.requireLogin,
  employeeController.listEmployee
);
router.get("/add", authMiddleware.requireLogin, employeeController.addEmployee);
router.get(
  "/edit/:id",
  authMiddleware.requireLogin,
  employeeController.editEmployee
);
router.get(
  "/details/:id",
  authMiddleware.requireLogin,
  employeeController.detailsEmployee
);

module.exports = router;
