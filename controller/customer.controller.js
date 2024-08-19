const path = require("path");

exports.listCustomer = async (req, res, next) => {
  res.render("../views/manager/customer/listCustomer.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.history_tickets_user = async (req, res, next) => {
  const id = req.params.id;
  res.render("../views/manager/customer/history_tickets.ejs", {
    id,
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
