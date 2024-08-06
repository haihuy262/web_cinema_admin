const axios = require("axios");
var fs = require("fs");
const FormData = require("form-data");

exports.getEmployee = async (req, res, next) => {
  res.render("../views/manager/employee/addEmployee.ejs");
};

exports.listEmployee = async (req, res, next) => {
  res.render("../views/manager/employee/listEmployee.ejs");
};

exports.addEmployee = async (req, res, next) => {
  try {
    const form = new FormData();
    const defaultImagePath = "public//images//avatar.jpg";

    if (req.file && req.file.fieldname === "image") {
      form.append("image", fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
      });
    } else {
      form.append("image", fs.createReadStream(defaultImagePath), {
        filename: "avatart.jpg",
      });
    }

    const { name, email, password, date_of_birth, number_phone, gender } = req.body;

    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    form.append("date_of_birth", date_of_birth);
    form.append("number_phone", number_phone);
    form.append("gender", gender);

    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    await axios.post(`${apiUrl}/users/staff`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...form.getHeaders(),
        // Đặt Header động: Để Axios tự động đặt header cho multipart/form-data
        // bằng cách không đặt thủ công Content-Type.
      },
    });

    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }

    res.render("../views/manager/employee/addEmployee.ejs", {
      success: "Nhân viên đã được tạo thành công!",
    });
  } catch (error) {
    res.render("../views/manager/employee/addEmployee.ejs", {
      error: "Tạo nhân viên thất bại.",
    });
    console.log(error);
  }
};

exports.editEmployee = async (req, res, next) => {
  let image = req.body.currentImage || "";

  if (req.file && req.file.fieldname === "image") {
    fs.renameSync(req.file.path, "./public/uploads/" + req.file.originalname);
    image = "/uploads/" + req.file.originalname;
  }

  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  const { name, email, number_phone, date_of_birth, gender } = req.body;

  try {
    await axios.put(
      `${apiUrl}/users/${id}`,
      { name, email, number_phone, date_of_birth, gender, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.detailsEmployee = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/users/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataStaffID = response.data.getstaff;
    res.render("../views/manager/employee/detailsEmployee.ejs", {
      dataStaffID,
      token,
      apiUrl,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    await axios.delete(`${apiUrl}/users/${id}`, {
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
