exports.getOverview = async (req, res, next) => {
  res.render("../views/dashboard/overview.ejs");
};
exports.getToken = async (req, res, next) => {
  if (req.session.admin.token) {
    res.json({ token: req.session.admin.token });
  } else {
    res.status(401).json({ message: "No token found" });
  }
};
