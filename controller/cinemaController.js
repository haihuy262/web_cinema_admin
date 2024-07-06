exports.cinemaList = async (req, res, next) => {
    res.render("../views/cinema/cinema_list.ejs"); 
  };
  exports.cinemaAdd = async (req, res, next) => {
    res.render("../views/cinema/cinema_add.ejs"); 
  };
  exports.roomList = async (req, res, next) => {
    res.render("../views/cinema/room_list.ejs"); 
  };
  exports.roomAdd = async (req, res, next) => {
    res.render("../views/cinema/room_add.ejs"); 
  };