

const axios = require('axios');
const { requireLogin } = require('../middleware/authMiddleware')
const fs = require('fs');
const FormData = require('form-data');
exports.discountList = async (req, res, next) => {
  try {
      
    const token = req.session.admin.token;

    const response = await axios.get('http://139.180.132.97:3000/discounts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const discounts = response.data;
   
    res.render("../views/discount/discount_list.ejs", { discounts });
   
  } catch (error) {
    if (error.response) {
     
      console.error('Server Error:', error.response.data);
      res.status(error.response.status).render("../views/movie/actor/list_actor.ejs", {
        error: 'Đã xảy ra lỗi khi lấy danh sách diễn viên.'
      });
    } else if (error.request) {
  
      console.error('Request Error:', error.request);
      res.status(500).render("../views/movie/actor/list_actor.ejs", {
        error: 'Không nhận được phản hồi từ server khi lấy danh sách diễn viên.'
      });
    } else {
     
      console.error('Error:', error.message);
      res.status(500).render("../views/movie/actor/list_actor.ejs", {
        error: 'Đã xảy ra lỗi khi xử lý yêu cầu lấy danh sách diễn viên.'
      });
    }
  }
    
  };
 exports.discountAdd = async (req, res, next) => {
    res.render("../views/discount/discount_add.ejs"); 
  };
  exports.updateStatus = async (req, res, next) => {
    const { id } = req.params; // Lấy ID từ tham số yêu cầu
    const { status } = req.body; // Lấy trạng thái từ body yêu cầu

    // Kiểm tra trường bắt buộc
    if (!status) {
        return res.status(400).json({ error: 'Trạng thái là bắt buộc.' });
    }

    try {
        const token = req.session.admin.token;

        const response = await axios.put(
            `http://139.180.132.97:3000/discounts/status/${id}`,
            { status }, // Gửi trạng thái mới lên server
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        console.log('Response from server:', response.data);

        return res.redirect("/discount/discount_list");
    } catch (error) {
        console.error('Error updating food status:', error);
        return res.render("../views/discount/discount_list.ejs", {
            error: 'Đã xảy ra lỗi khi cập nhật trạng thái food.',
        });
    }
};
exports.deleteDistcount = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;

  try {
    const response = await axios.delete(
      `http://139.180.132.97:3000/discounts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('check',response)
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
exports.cinemaList = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    console.log("token cinema controller:", token);

    const response = await axios.get('http://139.180.132.97:3000/cinemas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const cinemas = response.data.getAll;
 

    // Trả về dữ liệu danh sách rạp chiếu phim
    res.json({ success: true, getAll: cinemas });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.createDiscount = async (req, res, next) => {
  const { name, percent, type, cinema } = req.body;
  const image = req.file;

  // Kiểm tra các trường bắt buộc
  if (!name || !percent || !type || !image) {
    return res.status(400).json({ error: 'Tất cả các trường là bắt buộc.' });
  }

  try {
    const token = req.session.admin.token;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('percent', percent);
    formData.append('type', type);

    formData.append('image', fs.createReadStream(image.path));

    cinema.forEach(cinemaId => {
      formData.append('cinema', cinemaId);
    });

    const response = await axios.post(
      'http://139.180.132.97:3000/discounts',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          ...formData.getHeaders(),
        },
      }
    );

    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }

    console.log('Response data:', response.data);
    res.render("../views/discount/discount_add.ejs", {
      success: 'Tạo discount thành công!',
    });
  } catch (error) {
    console.error('Error creating discount:', error);
    res.render("../views/discount/discount_add.ejs", {
      error: 'Đã xảy ra lỗi khi tạo discount.'
    });
  }
};

