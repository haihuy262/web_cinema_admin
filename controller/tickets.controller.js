const { default: axios } = require("axios");

exports.listTickets = async (req, res, next) => {
  res.render("../views/manager/tickets/listTickets.ejs");
};

exports.detailsTickets = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  const arrUser = [];
  const arrSeat = [];
  const arrFood = [];

  try {
    const response = await axios.get(`${apiUrl}/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Mã tickets
    const idTickets = response.data.getTicket._id;
    const shorId = idTickets.substring(0, 8).toUpperCase();
    // Tên phim
    const movieName = response.data.getTicket.movie.name;
    // Giờ chiếu
    const time = response.data.getTicket.time.time;
    // Ngày chiếu
    const dateShow = response.data.getTicket.showdate.date;
    const dateString = dateShow.substring(0, 10);
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const formattedDate = `${day}-${month}-${year}`;
    // Phòng chiếu
    const room = response.data.getTicket.room.name;
    // Rạp chiếu
    const cinema = response.data.getTicket.cinema.name;
    // Ngày đặt
    const date = response.data.getTicket.date;
    const dateString2 = date.substring(0, 10);
    const dateParts2 = dateString2.split("-");
    const year2 = dateParts2[0];
    const month2 = dateParts2[1];
    const day2 = dateParts2[2];
    const formattedDate2 = `${day2}-${month2}-${year2}`;
    // Khách hàng
    const nameUser = response.data.getTicket.user.name;
    const emailUser = response.data.getTicket.user.email;
    arrUser.push(nameUser, emailUser);
    // Tổng tiền
    const total = response.data.getTicket.total;
    const formattedMoney = total.toLocaleString("en-US");
    // Ghế
    const seat = response.data.getTicket.seat;
    for (let i = 0; i < seat.length; i++) {
      if (seat[i] !== null) {
        arrSeat.push(seat[i].name, seat[i].price);
      } else {
        console.log("Dữ liệu", seat[i], "trống!");
      }
    }
    // Đồ ăn
    const food = response.data.getTicket.food;
    for (let i = 0; i < food.length; i++) {
      if (food[i].foodId !== null) {
        arrFood.push(food[i].foodId.name.toUpperCase(), food[i].quantity, food[i].foodId.price);
      } else {
        console.log("Dữ liệu", food[i], "trống!");
      }
    }

    res.render("../views/manager/tickets/detailsTickets.ejs", {
      maDonHang: shorId,
      tenPhim: movieName,
      gioChieu: time,
      ngayChieu: formattedDate,
      phongChieu: room,
      rapChieu: cinema,
      ngayDat: formattedDate2,
      khachHang: arrUser,
      tongTien: formattedMoney,
      seat: arrSeat,
      food: arrFood,
    });
  } catch (error) {
    console.log(error);
  }
};
