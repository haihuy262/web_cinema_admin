const axios = require('axios');
const { requireLogin } = require('../middleware/authMiddleware')
const fs = require('fs');
const FormData = require('form-data');
exports.genreList = async (req, res, next) => {
    try {
      const token = req.session.admin.token;
  
      const response = await axios.get('http://139.180.132.97:3000/genres', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const genres = response.data;
     
      res.render("../views/movie/genre/genre_list.ejs",{ genres }); 
      console.log('check',genres)
    }catch (error) {
      console.log(error);
  
      // Trả về thông báo lỗi
      res.status(500).json({ success: false, error: error.message });
    }
  };
  exports.addGenre = async (req, res, next) => {
    res.render("../views/movie/genre/genre_add.ejs",); 
  };
  exports.createGenre = async (req, res, next) => {
    const { name } = req.body;
    const image = req.file;
  
    if (!name || !image) {
      return res.status(400).json({ error: 'Tên và ảnh là bắt buộc.' });
    }
  
    try {
     
      const token = req.session.admin.token;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', fs.createReadStream(image.path), {
        filename: image.originalname,
      });
  
      const response = await axios.post(
        'http://139.180.132.97:3000/genres',
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
      console.log('check',response.data)
      res.render("../views/movie/genre/genre_add.ejs", {    
        success: 'Tạo genre thành công!',
        genre: response.data.genre
      });
    } catch (error) {
      res.render("../views/movie/genre/genre_add.ejs", {
        error: 'Đã xảy ra lỗi khi tạo genre.'
      });
      console.log(error);
    }
  };
  exports.updateGenre = async (req, res, next) => {
    const { id } = req.params; // Lấy ID từ tham số yêu cầu
    const { name } = req.body;
    const image = req.file;

    // Kiểm tra các trường bắt buộc
    if (!name ) {
        return res.status(400).json({ error: 'Tên là bắt buộc.' });
    }

    try {
        const token = req.session.admin.token;
        const formData = new FormData();
        formData.append('name', name);
       

        if (image) {
            formData.append('image', fs.createReadStream(image.path));
        }

        const response = await axios.put(
            `http://139.180.132.97:3000/genres/${id}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...formData.getHeaders(),
                },
            }
        );

        if (image) {
            fs.unlinkSync(image.path);
        }
        res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
};
  exports.deleteGenre = async (req, res, next) => {
    const id = req.params.id;
    const token = req.session.admin.token;
  
    try {
      const response = await axios.delete(
        `http://139.180.132.97:3000/genres/${id}`,
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