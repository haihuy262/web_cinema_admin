var express = require("express");
var router = express.Router();
var movieController = require("../controller/movieController");
var authMiddleware = require("../middleware/authMiddleware");

router.get("/list", authMiddleware.requireLogin, movieController.movieList);
router.get("/add", authMiddleware.requireLogin, movieController.addMovie);
router.get("/update", authMiddleware.requireLogin, movieController.updateMovie);
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
router.get(
  "/listDirectors",
  authMiddleware.requireLogin,
  movieController.listDirectors
);
module.exports = router;
