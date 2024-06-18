exports.listEmployee = async (req, res, next) => {
  res.render("../views/manager/employee/listEmployee.ejs");
};
exports.addEmployee = async (req, res, next) => {
  res.render("../views/manager/employee/addEmployee.ejs");
};
