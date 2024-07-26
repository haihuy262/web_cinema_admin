const axios = require("axios");
const { requireLogin } = require("../middleware/authMiddleware");
const fs = require("fs");
const FormData = require("form-data");

exports.cinemaAdd = async (req, res, next) => {
  res.render("../views/cinema/cinema_add.ejs");
};

exports.roomAdd = async (req, res, next) => {
  res.render("../views/cinema/room_add.ejs");
};

exports.creatCinema = async (req, res, next) => {
  const { name, address, hotline } = req.body;

  console.log("name", req.body.name);
  console.log("address", req.body.address);
  console.log("hotline", req.body.hotline);

  // // Kiểm tra các trường bắt buộc
  // if (!name || !address || !hotline) {
  //   return res
  //     .status(400)
  //     .json({ error: "Name, address, và hotline là bắt buộc." });
  // }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    // Tạo FormData để gửi dữ liệu

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

    // Log để kiểm tra
    console.log("Cinema created:", name, address, hotline);

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
    console.log(cinemas);

    res.render("../views/cinema/cinema_list.ejs", { cinemas });
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
    return res
      .status(400)
      .json({ error: "Tên, địa chỉ và hotline là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("hotline", hotline);
    formData.append("address", address);

    const response = await axios.put(`${apiUrl}/cinemas/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });
    console.log("est", name, address, hotline);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Đã xảy ra lỗi khi cập nhật." });
  }
};

exports.roomList = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rooms = response.data.getall;
    console.log(rooms);

    res.render("../views/cinema/room_list.ejs", { rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    res.status(500).send("Error fetching rooms");
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
