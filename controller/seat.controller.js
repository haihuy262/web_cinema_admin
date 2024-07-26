const { default: axios } = require("axios");

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

    res.render("../views/seat/listSeat.ejs", { dataCinemas, token, apiUrl });
  } catch (error) {
    console.log(error);
  }
};
