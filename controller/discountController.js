

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
    console.log('check',discounts)
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