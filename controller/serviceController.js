const axios = require("axios");
const { requireLogin } = require("../middleware/authMiddleware");
const fs = require("fs");
const FormData = require("form-data");

exports.serviceList = async (req, res, next) => {
  res.render("../views/service/service_list.ejs");
};

exports.serviceAdd = async (req, res, next) => {
  res.render("../views/service/service_add.ejs");
};
exports.createFood = async (req, res, next) => {
  const { name, price } = req.body;
  const image = req.file;

  if (!name || !price || !image) {
    return res.status(400).json({ error: "Tên, giá và ảnh là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", fs.createReadStream(image.path));

    const response = await axios.post(`${apiUrl}/foods`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });
    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }
    res.redirect("/service/serviceList");
    res.render("../views/service/service_list.ejs", {
      success: "Tạo food thành công!",
    });
  } catch (error) {
    res.render("../views/service/service_list.ejs", {
      error: "Đã xảy ra lỗi khi tạo food.",
    });
    console.log(error);
  }
};

exports.updateFood = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số yêu cầu
  const { name, price } = req.body;
  const image = req.file;

  // Kiểm tra các trường bắt buộc
  if (!name || !price) {
    return res.status(400).json({ error: "Tên và giá là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);

    if (image) {
      formData.append("image", fs.createReadStream(image.path));
    }

    const response = await axios.put(`${apiUrl}/foods/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    if (image) {
      fs.unlinkSync(image.path);
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.deleteFood = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.delete(`${apiUrl}/foods/${id}`, {
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
