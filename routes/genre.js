var express = require("express");
var router = express.Router();
var genreController = require("../controller/genre.contronller");
var authMiddleware = require("../middleware/authMiddleware");
var multer = require("multer");
var uploadImage = multer({ dest: "./tmp" });

router.get(
  "/addGenre",
  authMiddleware.requireLogin,
  genreController.addGenre
);
router.get(
  "/listGenre",
  authMiddleware.requireLogin,
  genreController.genreList
);
router.post(
    "/createGenre",
    authMiddleware.requireLogin,
    uploadImage.single("image"),
    genreController.createGenre
  );
  router.put(
    "/updateGenre/:id",
    authMiddleware.requireLogin,
    uploadImage.single("image"),
    genreController.updateGenre
  );
  router.delete('/delete/:id', genreController.deleteGenre);
  module.exports = router;