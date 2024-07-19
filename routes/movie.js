var express = require("express");
var router = express.Router();
var movieController = require("../controller/movieController");
var authMiddleware = require("../middleware/authMiddleware");
var multer = require("multer");
var uploadImage = multer({ dest: "./tmp" });
router.get("/list", authMiddleware.requireLogin, movieController.movieList);
router.get("/add", authMiddleware.requireLogin, movieController.addMovie);
router.post(
  "/createMovie",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  uploadImage.single("videos"),
  movieController.createMovie
);
router.get("/update/:id", authMiddleware.requireLogin, movieController.updateMovie);
router.get("/actor", authMiddleware.requireLogin, movieController.addActor);
router.get(
  "/addDirectors",
  authMiddleware.requireLogin,
  movieController.addDirectors
);
router.get(
  "/listActor",
  authMiddleware.requireLogin,
  movieController.listActor
);
router.put(
  "/updateDirecters/:id",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  movieController.updateDirecters
);
router.get(
  "/listDirectors",
  authMiddleware.requireLogin,
  movieController.listDirector
);
router.put(
  "/updateActor/:id",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  movieController.updateActor
);
router.post(
  "/createDirector",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  movieController.createDirector
);
router.post(
  "/createActor",
  authMiddleware.requireLogin,
  uploadImage.single("image"),
  movieController.createActor
);
router.delete('/directors/:id', movieController.deleteDirector);
router.delete('/actors/:id', movieController.deleteActor);
router.get(
  "/optionActor",
  authMiddleware.requireLogin,
  movieController.listActorOption
);
router.get(
  "/optionDirector",
  authMiddleware.requireLogin,
  movieController.listDirectorOption
);
router.get(
  "/optionGenre",
  authMiddleware.requireLogin,
  movieController.genreListOption
);
module.exports = router;
