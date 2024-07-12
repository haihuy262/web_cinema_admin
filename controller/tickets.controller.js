exports.listOrder = async (req, res, next) => {
  res.render("../views/manager/tickets/listTickets.ejs");
};
exports.detailsOrder = async (req, res, next) => {
  res.render("../views/manager/tickets/detailsTickets.ejs");
};
