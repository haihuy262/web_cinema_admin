const axios = require("axios");
const path = require("path");

exports.cinemaAdd = async (req, res, next) => {
  res.render("../views/cinema/cinema_add.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.roomAdd = async (req, res, next) => {
  res.render("../views/cinema/room_add.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.creatCinema = async (req, res, next) => {
  const { name, address, hotline } = req.body;

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    // Gửi yêu cầu POST tới API để tạo cinema mới
    const response = await axios.post(
      `${apiUrl}/cinemas`,
      {
        name,
        address,
        hotline,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.redirect("/cinema/cinemaList");
  } catch (error) {
    console.error("Error creating cinema:", error);
    return res.render("../views/cinema/cinema_add.ejs", {
      error: "Đã xảy ra lỗi khi tạo cinema.",
    });
  }
};

exports.cinemaList = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/cinemas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cinemas = response.data;

    res.render("../views/cinema/cinema_list.ejs", {
      cinemas,
      layout: path.join(__dirname, "../layouts/dashboard.ejs"),
    });
  } catch (error) {
    console.error("Error fetching cinemas:", error.message);
  }
};

exports.deleteCinema = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.delete(`${apiUrl}/cinemas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.updateCinema = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số yêu cầu
  const { name, address, hotline } = req.body;

  if (!name || !hotline || !address) {
    return res.status(400).json({ error: "Tên, địa chỉ và hotline là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.put(
      `${apiUrl}/cinemas/${id}`,
      { name, address, hotline },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Đã xảy ra lỗi khi cập nhật." });
  }
};

exports.updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const { name, cinema, showtime, movie } = req.body;

  if (!name || !cinema || !showtime || !movie) {
    return res.status(400).json({ error: "Tên, địa chỉ và hotline là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.put(
      `${apiUrl}/rooms/${id}`,
      { name, cinema, showtime, movie },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("test", name, cinema, showtime, movie);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Đã xảy ra lỗi khi cập nhật." });
  }
};
exports.roomList = async (req, res, next) => {
  res.render("../views/cinema/room_list.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
exports.roomListTable = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const page = req.query.page || 1;
    const response = await axios.get(`${apiUrl}/rooms?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rooms = response.data.getall;
    res.json({ success: true, getAll: rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateRoom = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số yêu cầu
  const { name, movie, showtime, cinema } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!name || !movie || !showtime || !cinema) {
    return res.status(400).json({ error: "Tên, phim, thời gian chiếu và rạp là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    // Gửi yêu cầu PUT đến API bên ngoài với dữ liệu mới
    const response = await axios.put(
      `${apiUrl}/rooms/${id}`,
      {
        name,
        movie,
        showtime: Array.isArray(showtime) ? showtime : [showtime], // Đảm bảo showtime là mảng
        cinema,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Đã xảy ra lỗi khi cập nhật." });
  }
};

exports.deleteRoom = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;

  try {
    const response = await axios.delete(`${apiUrl}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
