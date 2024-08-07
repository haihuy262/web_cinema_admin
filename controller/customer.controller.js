exports.listCustomer = async (req, res, next) => {
  res.render("../views/manager/customer/listCustomer.ejs");
};
exports.history_tickets_user = async (req, res, next) => {
  const id = req.params.id;
  res.render("../views/manager/customer/history_tickets.ejs", { id });
};
