var express = require("express");
var router = express.Router();
var discountController = require("../controller/discountController");
var authMiddleware = require("../middleware/authMiddleware");
var multer = require("multer");
var uploadImage = multer({ dest: "./tmp" });
router.get(
  "/discountList",
  authMiddleware.requireLogin,
  discountController.discountList
);
router.get(
  "/discountAdd",
  authMiddleware.requireLogin,
  discountController.discountAdd
);
router.post(
  "/createDiscount",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  discountController.createDiscount
);
router.put(
  "/updateStatus/:id",
  authMiddleware.requireLogin,
  discountController.updateStatus
);
router.put(
  "/updateDiscount/:id",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  discountController.updateDiscount
);

router.delete('/deleteDistcount/:id',  
  authMiddleware.requireLogin,
  discountController.deleteDistcount);
  router.get(
    "/cinemaList",
    authMiddleware.requireLogin,
    discountController.cinemaList
  );
module.exports = router;
