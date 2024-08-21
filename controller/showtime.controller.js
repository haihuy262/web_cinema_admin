const path = require("path");

exports.getCreateTime = async (req, res, next) => {
  res.render("../views/manager/showtime/addTime.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
exports.getCreateShowtime = async (req, res, next) => {
  res.render("../views/manager/showtime/addShowtime.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
exports.getListShowtime = async (req, res, next) => {
  res.render("../views/manager/showtime/listShowtime.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
