const { default: axios } = require("axios");

exports.listOrder = async (req, res, next) => {
  const token = req.session.admin.token;

  var arrShortID = [];
  var arrCinema = [];
  var arrMovieName = [];
  var arrGenre = [];
  var arrStatus = [];
  var arrDate = [];
  var arrTime = [];
  var arrTotalMoney = [];

  try {
    const response = await axios.get("http://139.180.132.97:3000/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const ticketsData = response.data.getall;
    console.log(ticketsData);

    for (var i = 0; i < ticketsData.length; i++) {
      // Thể loại phim
      let genre = ticketsData[i].movie.genre;
      let dataGenre = genre.map((g) => g.name).join(", ");
      arrGenre.push(dataGenre);
      // Mã tickets
      let id = ticketsData[i]._id;
      let shorId = id.substring(0, 8).toUpperCase();
      arrShortID.push(shorId);
      // Tên phim
      let movieName = ticketsData[i].movie.name;
      arrMovieName.push(movieName);
      // Rạp chiếu
      let cinema = ticketsData[i].cinema.name;
      arrCinema.push(cinema);
      // Trạng thái
      let status = ticketsData[i].status;
      arrStatus.push(status);
      // Ngày chiếu
      let date = ticketsData[i].showdate.date;
      let dateString = date.substring(0, 10);
      let dateParts = dateString.split("-");
      let year = dateParts[0];
      let month = dateParts[1];
      let day = dateParts[2];
      let formattedDate = `${day}-${month}-${year}`;
      arrDate.push(formattedDate);
      // Ngày chiếu
      let time = ticketsData[i].time.time;
      arrTime.push(time);
      // Tổng tiền
      let totalMoney = ticketsData[i].total;
      let formattedMoney = totalMoney.toLocaleString("en-US");
      arrTotalMoney.push(formattedMoney);
    }

    res.render("../views/manager/tickets/listTickets.ejs", {
      ticketsData,
      theLoai: arrGenre,
      maDonHang: arrShortID,
      tenPhim: arrMovieName,
      rapChieu: arrCinema,
      trangThai: arrStatus,
      ngayChieu: arrDate,
      gioChieu: arrTime,
      tongTien: arrTotalMoney,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.detailsOrder = async (req, res, next) => {
  res.render("../views/manager/tickets/detailsTickets.ejs");
};
