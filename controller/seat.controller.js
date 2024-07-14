const { default: axios } = require("axios");

exports.listSeat = async (req, res, next) => {
  const token = req.session.admin.token;
  try {
    const response = await axios.get("http://139.180.132.97:3000/seats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataSeat = response.data;
    console.log(dataSeat);
  } catch (error) {
    console.log(error);
  }
  res.render("../views/seat/listSeat.ejs");
};

exports.addSeat = async (req, res, next) => {
  res.render("../views/seat/addSeat.ejs");
};
