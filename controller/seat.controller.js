const { default: axios } = require("axios");

exports.listSeat = async (req, res, next) => {
  const token = req.session.admin.token;

  try {
    const response = await axios.get("http://139.180.132.97:3000/cinemas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataCinemas = response.data;

    res.render("../views/seat/listSeat.ejs", { dataCinemas, token });
  } catch (error) {
    console.log(error);
  }
};

exports.addSeat = async (req, res, next) => {
  res.render("../views/seat/addSeat.ejs");
};
