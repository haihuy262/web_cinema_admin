exports.getOverview = async (req, res, next) => {
  res.render("../views/dashboard/overview.ejs");
};
exports.getRevenueCinema = async (req, res, next) => {
  res.render("../views/dashboard/revenue_cinema.ejs");
};
exports.getRevenueMovie = async (req, res, next) => {
  res.render("../views/dashboard/revenue_movie.ejs");
};
