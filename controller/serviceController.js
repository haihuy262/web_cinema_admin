exports.serviceList = async (req, res, next) => {
    res.render("../views/service/service_list.ejs"); 
  };
  exports.serviceAdd = async (req, res, next) => {
    res.render("../views/service/service_add.ejs"); 
  };