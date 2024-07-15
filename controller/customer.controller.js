const axios = require("axios");

exports.listCustomer = async (req, res, next) => {
  const token = req.session.admin.token;

  try {
    const response = await axios.get("http://139.180.132.97:3000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data.getAll;

    res.render("../views/manager/customer/listCustomer.ejs", { userData });
  } catch (error) {
    console.log(error);
  }
};
