var express = require("express");
var router = express.Router();
var movieController = require("../controller/movieController");

router.get("/list", movieController.movieList);
router.get("/add", movieController.addMovie);
router.get("/update", movieController.updateMovie);
router.get("/actor", movieController.addActor);
router.get("/addDirectors", movieController.addDirectors);
router.get("/listActor", movieController.listActor);
router.get("/listDirectors", movieController.listDirectors);
module.exports = router;