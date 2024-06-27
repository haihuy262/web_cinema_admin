exports.requireLogin = (req, res, next) => {
  // Kiểm tra trạng thái đăng nhập của người dùng
  if (req.session && req.session.admin && req.session.admin.token) {
    // Nếu đã đăng nhập, cho phép đi tiếp
    next();
  } else {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    res.redirect("/login");
  }
};
