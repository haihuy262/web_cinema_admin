var express = require("express");
var router = express.Router();
var employeeController = require("../controller/employee.controller");
var authMiddleware = require("../middleware/authMiddleware");
var multer = require("multer");
var uploadImage = multer({ dest: "./tmp" });

router.get("/add", authMiddleware.requireLogin, employeeController.getEmployee);
// Update Staff
router.put(
  "/edit/:id",
  authMiddleware.requireLogin,
  employeeController.editEmployee
);
// List Staff
router.get(
  "/list",
  authMiddleware.requireLogin,
  employeeController.listEmployee
);
// Details Staff
router.get(
  "/details/:id",
  authMiddleware.requireLogin,
  employeeController.detailsEmployee
);
// Add Staff
router.post(
  "/add",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  employeeController.addEmployee
);
// Delete Staff
router.delete(
  "/delete/:id",
  authMiddleware.requireLogin,
  employeeController.deleteEmployee
);

module.exports = router;
