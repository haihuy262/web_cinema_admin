const axios = require("axios");

exports.listCustomer = async (req, res, next) => {
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data.getAll;

    res.render("../views/manager/customer/listCustomer.ejs", {
      userData,
      apiUrl,
    });
  } catch (error) {
    console.log(error);
  }
};
