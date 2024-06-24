exports.movieList = async (req, res, next) => {
    res.render("../views/movie/list_movie.ejs"); 
  };
exports.addMovie = async (req, res, next) => {
    res.render("../views/movie/add_movie.ejs"); 
  };
  exports.updateMovie = async (req, res, next) => {
    res.render("../views/movie/update_movie.ejs"); 
  };
  exports.addActor = async (req, res, next) => {
    res.render("../views/movie/actor/add_actor.ejs"); 
  };
  exports.listActor = async (req, res, next) => {
    res.render("../views/movie/actor/list_actor.ejs"); 
  };
  exports.addDirectors = async (req, res, next) => {
    res.render("../views/movie/directors/add_directors.ejs"); 
  };
  exports.listDirectors = async (req, res, next) => {
    res.render("../views/movie/directors/list_directors.ejs"); 
  };