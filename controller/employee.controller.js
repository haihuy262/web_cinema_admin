exports.listEmployee = async (req, res, next) => {
  res.render("../views/manager/employee/listEmployee.ejs");
};

exports.addEmployee = async (req, res, next) => {
  try {
    // Lấy dữ liệu từ request body
    const {
      name,
      email,
      password,
      date_of_birth,
      number_phone,
      gender,
      image,
    } = req.body;

    // Token của admin
    const adminToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjZkOTlhNzc0MjM3ZTcwMzA1NTFlZjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg3Mzg2MDMsImV4cCI6MTcxOTM0MzQwM30.zh3reTKCCHQTwmjESsl5cbuqgWAGLEwkY2iQYjHwcGg";

    // Gửi dữ liệu tới API bằng phương thức POST kèm token trong headers
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
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // Trả về phản hồi từ API cho client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Xử lý lỗi nếu có
    next(error);
  }
  res.render("../views/manager/employee/addEmployee.ejs");
};
