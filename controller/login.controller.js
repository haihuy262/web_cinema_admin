const axios = require("axios");

exports.getLogin = async (req, res, next) => {
  res.render("../views/login/login.ejs");
};

exports.getLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.redirect("/dashboard/overview");
    } else {
      res.redirect("/login");
    }
  });
};

exports.postLogin = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const response = await axios.post(
      "http://139.180.132.97:3000/auth/login-admin",
      {
        name,
        password,
      }
    );
    if (
      response.data.admin.data.name === name &&
      response.data.admin.data.password === password
    ) {
      req.session.admin = {
        id: response.data.admin.data._id,
        name: response.data.admin.data.name,
        role: response.data.admin.data.role,
        token: response.data.token.access_token,
      };
      res.render("../views/login/login.ejs", {
        success: "Đăng nhập thành công.",
      });
    } else {
      res.render("../views/login/login.ejs", {
        error: "Đăng nhập thất bại. Vui lòng thử lại.",
      });
    }
  } catch (error) {
    res.render("../views/login/login.ejs", {
      error: "Tài khoản hoặc mật khẩu không đúng.",
    });
  }
};
