exports.discountList = async (req, res, next) => {
    res.render("../views/discount/discount_list.ejs"); 
  };
  exports.discountAdd = async (req, res, next) => {
    res.render("../views/discount/discount_add.ejs"); 
  };
