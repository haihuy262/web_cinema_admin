exports.getCreateTime = async (req, res, next) => {
  res.render("../views/manager/showtime/addTime.ejs");
};
exports.getCreateShowtime = async (req, res, next) => {
  res.render("../views/manager/showtime/addShowtime.ejs");
};
exports.getListShowtime = async (req, res, next) => {
  res.render("../views/manager/showtime/listShowtime.ejs");
};
