exports.listOrder = async (req, res, next) => {
  res.render("../views/manager/order/listOrder.ejs");
};
exports.detailsOrder = async (req, res, next) => {
  res.render("../views/manager/order/detailsOrder.ejs");
};
