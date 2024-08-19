const axios = require("axios");
const path = require("path");

exports.getOverview = async (req, res, next) => {
  res.render("../views/dashboard/overview.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.movieList = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const response = await axios.get(`${apiUrl}/movies/no/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movies = response.data.getall;

    res.json({ success: true, getAll: movies });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.total = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/tickets/revenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const total = response.data.total;

    res.json({ success: true, getAll: total });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.totalCinema = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const { cinemaId, movieId, dayStart, dayEnd } = req.query;

    const response = await axios.get(`${apiUrl}/tickets/revenue/cmd`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        cinemaId,
        movieId,
        dayStart,
        dayEnd,
      },
    });

    const total = response.data;

    if (Array.isArray(total) && total.length > 0) {
      const totalRevenue = total.reduce((acc, item) => acc + item.totalRevenue, 0);
      res.json({ success: true, totalRevenue, revenueData: total });
    } else {
      console.log("No totalRevenue found in response");
      res.json({ success: false, error: "No totalRevenue found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.totalMovie = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const page = req.query.page || 1;
    const response = await axios.get(`${apiUrl}/tickets/revenue/movie?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movieTotal = response.data;

    res.json({ success: true, getAll: movieTotal });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.totaListCinema = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/tickets/revenue/cinema`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cinemaTotal = response.data;

    res.json({ success: true, getAll: cinemaTotal });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
