

const axios = require('axios');
const FormData = require('form-data');
const { param } = require('../app');
exports.getOverview = async (req, res, next) => {
  res.render("../views/dashboard/overview.ejs");
};
exports.movieList = async (req, res, next) => {
  try {
    const token = req.session.admin.token;

    const response = await axios.get('http://139.180.132.97:3000/movies/no/login', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const movies = response.data.getall;
    
    res.json({ success: true, getAll: movies });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.total = async (req, res, next) => {
  try {
    const token = req.session.admin.token;

    const response = await axios.get('http://139.180.132.97:3000/tickets/revenue', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const total = response.data.total;
   
    res.json({ success: true, getAll: total });
    
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.totalCinema = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const { cinemaId, movieId, startDate, endDate } = req.query;

    const response = await axios.get('http://139.180.132.97:3000/tickets/revenue/cmd', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        cinemaId,
        movieId,
        startDate,
        endDate
      }
    });

    const total = response.data;
    if (Array.isArray(total) && total.length > 0) {
      const totalRevenue = total[0].totalRevenue;
      
      console.log('totalRevenue',total);
      res.json({ success: true, getAll: totalRevenue, revenueData: total });
    } else {
      console.log('No totalRevenue found in response');
      res.json({ success: false, error: 'No totalRevenue found' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: error.message });
  }
};

exports.totalMovie = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const page = req.query.page || 1;
    const response = await axios.get(`http://139.180.132.97:3000/tickets/revenue/movie?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const movieTotal = response.data;
   
    res.json({ success: true, getAll: movieTotal });
    
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.totaListCinema = async (req, res, next) => {
  try {
    const token = req.session.admin.token;

    const response = await axios.get('http://139.180.132.97:3000/tickets/revenue/cinema', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const cinemaTotal = response.data;
   
    res.json({ success: true, getAll: cinemaTotal });
    
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};