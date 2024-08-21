const axios = require("axios");
const { requireLogin } = require("../middleware/authMiddleware");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

exports.discountList = async (req, res, next) => {
  res.render("../views/discount/discount_list.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.discountListTable = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const page = req.query.page || 1;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/discounts/admin?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const discounts = response.data.getall;

    res.json({ success: true, getAll: discounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.discountAdd = async (req, res, next) => {
  res.render("../views/discount/discount_add.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.updateStatus = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số yêu cầu
  const { status } = req.body; // Lấy trạng thái từ body yêu cầu

  // Kiểm tra trường bắt buộc
  if (!status) {
    return res.status(400).json({ error: "Trạng thái là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.put(
      `${apiUrl}/discounts/status/${id}`,
      { status }, // Gửi trạng thái mới lên server
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Kiểm tra nếu phản hồi từ API thành công
    if (response.status === 200) {
      return res.status(200).json({ message: "Trạng thái đã được cập nhật thành công." });
    } else {
      return res.status(response.status).json({ error: response.data.error || "Lỗi từ server." });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    // Trả về thông báo lỗi chung nếu có lỗi khi gửi yêu cầu
    return res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật trạng thái." });
  }
};

exports.deleteDistcount = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.delete(`${apiUrl}/discounts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("check", response);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
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

    res.json({ success: true, getAll: cinemas });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.createDiscount = async (req, res, next) => {
  const { name, percent, type, cinema, dayEnd, dayStart } = req.body;
  const image = req.file;

  // Kiểm tra các trường bắt buộc
  if (!name || !percent || !type || !image || !dayStart || !dayEnd) {
    return res.status(400).json({ error: "Tất cả các trường là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("percent", percent);
    formData.append("type", type);
    formData.append("dayStart", dayStart);
    formData.append("dayEnd", dayEnd);

    formData.append("image", fs.createReadStream(image.path));

    for (let i = 0; i < cinema.length; i++) {
      formData.append(`cinema[${i}]`, cinema[i]);
    }

    const response = await axios.post(`${apiUrl}/discounts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }

    res.render("../views/discount/discount_add.ejs", {
      success: "Tạo discount thành công!",
      layout: path.join(__dirname, "../layouts/dashboard.ejs"),
    });
  } catch (error) {
    console.error("Error creating discount:", error);
    res.render("../views/discount/discount_add.ejs", {
      error: "Đã xảy ra lỗi khi tạo discount.",
      layout: path.join(__dirname, "../layouts/dashboard.ejs"),
    });
  }
};

exports.updateDiscount = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số yêu cầu
  const { name, percent, type, cinema, dayEnd, dayStart } = req.body;
  const image = req.file;

  // Kiểm tra các trường bắt buộc
  if (!name || !percent || !type || !image || !dayStart || !dayEnd) {
    return res.status(400).json({ error: "Tên là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("percent", percent);
    formData.append("type", type);
    formData.append("dayStart", dayStart);
    formData.append("dayEnd", dayEnd);

    for (let i = 0; i < cinema.length; i++) {
      formData.append(`cinema[${i}]`, cinema[i]);
    }

    if (image) {
      formData.append("image", fs.createReadStream(image.path));
    }

    const response = await axios.put(`${apiUrl}/discounts/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    if (image) {
      fs.unlinkSync(image.path);
    }
    console.log("dataaaa", name, percent, type, cinema, dayEnd, dayStart, image);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
