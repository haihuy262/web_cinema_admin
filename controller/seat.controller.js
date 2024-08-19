const { default: axios } = require("axios");
const path = require("path");

exports.listSeat = async (req, res, next) => {
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/cinemas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataCinemas = response.data;

    res.render("../views/seat/listSeat.ejs", {
      dataCinemas,
      token,
      apiUrl,
      layout: path.join(__dirname, "../layouts/dashboard.ejs"),
    });
  } catch (error) {
    console.log(error);
  }
};
