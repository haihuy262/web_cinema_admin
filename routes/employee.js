var express = require("express");
var router = express.Router();
var employeeController = require("../controller/employee.controller");
var authMiddleware = require("../middleware/authMiddleware");
var multer = require("multer");
var uploadImage = multer({ dest: "./tmp" });

router.get(
  "/list",
  authMiddleware.requireLogin,
  employeeController.listEmployee
);
router.get("/add", authMiddleware.requireLogin, employeeController.getEmployee);
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
router.post(
  "/add",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  employeeController.addEmployee
);
router.delete(
  "/delete/:id",
  authMiddleware.requireLogin,
  employeeController.deleteEmployee
);

module.exports = router;
