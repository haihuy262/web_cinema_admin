const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

exports.serviceList = async (req, res, next) => {
  res.render("../views/service/service_list.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.serviceAdd = async (req, res, next) => {
  res.render("../views/service/service_add.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
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
