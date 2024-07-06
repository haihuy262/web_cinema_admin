const axios = require("axios");
var fs = require("fs");

exports.getEmployee = async (req, res, next) => {
  res.render("../views/manager/employee/addEmployee.ejs");
};

exports.listEmployee = async (req, res, next) => {
  const token = req.session.admin.token;

  try {
    const response = await axios.get("http://139.180.132.97:3000/users/staff", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const staffData = response.data.getall;
    res.render("../views/manager/employee/listEmployee.ejs", { staffData });
  } catch (error) {
    console.log(error);
  }
};

exports.addEmployee = async (req, res, next) => {
  try {
    let image = "";

    if (req.file && req.file.fieldname === "image") {
      fs.renameSync(req.file.path, "./public/uploads/" + req.file.originalname);
      image = "/uploads/" + req.file.originalname;
    }

    const { name, email, password, date_of_birth, number_phone, gender } =
      req.body;

    const token = req.session.admin.token;

    const response = await axios.post(
      "http://139.180.132.97:3000/users/staff",
      {
        name,
        email,
        password,
        date_of_birth,
        number_phone,
        gender,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

  const { name, email, number_phone, date_of_birth, gender } = req.body;

  try {
    const response = await axios.put(
      `http://139.180.132.97:3000/users/${id}`,
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

  try {
    const response = await axios.get(
      `http://139.180.132.97:3000/users/staff/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const dataStaffID = response.data.getstaff;
    res.render("../views/manager/employee/detailsEmployee.ejs", {
      dataStaffID,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;

  try {
    const response = await axios.delete(
      `http://139.180.132.97:3000/users/${id}`,
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
