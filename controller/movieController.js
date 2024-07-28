const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

exports.movieList = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movies = response.data.getall;
    res.render("../views/movie/list_movie.ejs", { movies, apiUrl });

  
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      res.status(error.response.status).render("../views/movie/list_movie.ejs"),
        {
          error: "Đã xảy ra lỗi khi lấy danh sách phim.",
        };
    } else if (error.request) {
      console.error("Request Error:", error.request);
      res.status(500).render("../views/movie/list_movie.ejs"),
        {
          error: "Không nhận được phản hồi từ server khi lấy danh sách phim.",
        };
    } else {
      console.error("Error:", error.message);
      res.status(500).render("../views/movie/list_movie.ejs"),
        {
          error: "Đã xảy ra lỗi khi xử lý yêu cầu lấy danh sách phim.",
        };
    }
  }
};

exports.addMovie = async (req, res, next) => {
  res.render("../views/movie/add_movie.ejs");
};

exports.createMovie = async (req, res, next) => {
  const {
    name,
    duration,
    director,
    genre,
    language,
    subtitle,
    censorship,
    actor,
    rate,
    storyline,
    movie_format,
    release_date,
  } = req.body;
  const image = req.file;
  const videos = req.files; // Lấy file trailer từ req.files

  // Kiểm tra các trường bắt buộc
  if (
    !name ||
    !duration ||
    !director ||
    !genre ||
    !language ||
    !subtitle ||
    !censorship ||
    !actor ||
    !rate ||
    !storyline ||
    !movie_format ||
    !release_date ||
    !image ||
    !videos
  ) {
    return res.status(400).json({ error: "Tất cả các trường là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("director", director);
    formData.append("genre", genre);
    formData.append("language", language);
    formData.append("subtitle", subtitle);
    formData.append("censorship", censorship);
    formData.append("actor", actor);
    formData.append("rate", rate);
    formData.append("storyline", storyline);
    formData.append("movie_format", movie_format);
    formData.append("release_date", release_date);
    formData.append("image", fs.createReadStream(image.path), {
      filename: image.originalname,
    });
    formData.append("videos", fs.createReadStream(videos.path), {
      filename: videos.originalname,
    });

    const response = await axios.post(`${apiUrl}/movies`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    // Xóa tệp tin đã tải lên sau khi gửi
    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }
    if (req.file && req.file.fieldname === "videos") {
      fs.unlinkSync(req.file.path);
    }

    res.render("../views/movie/add_movie.ejs", {
      success: "Tạo phim thành công!",
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.render("../views/movie/add_movie.ejs", {
      error: "Đã xảy ra lỗi khi tạo phim.",
    });
  }
};

exports.udMovie = async (req, res, next) => {
  res.render("../views/movie/update_movie.ejs");
};

exports.updateMovie = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số yêu cầu
  const { name, duration, subtitle, censorship, rate } = req.body;
  // const image = req.file;
  // const videos = req.files;
  // Kiểm tra các trường bắt buộc
  if (
    !name ||
    !duration ||
    !subtitle ||
    !censorship ||
    !rate 
    // !release_date ||
    // !image ||
    // !videos
  ) {
    return res.status(400).json({ error: "Tất cả các trường là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("subtitle", subtitle);
    formData.append("censorship", censorship);
    formData.append("rate", rate);
    // formData.append("release_date", release_date);
    // if (image) {
    //   formData.append("image", fs.createReadStream(image.path));
    // }
    // if (videos) {
    //   formData.append("videos", fs.createReadStream(videos.path));
    // }

    const response = await axios.put(`${apiUrl}/movies/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    // if (image) {
    //   fs.unlinkSync(image.path);
    // }
    // if (videos) {
    //   fs.unlinkSync(videos.path);
    // }
console.log("check",)
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
exports.deleteMovie = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.delete(`${apiUrl}/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.addActor = async (req, res, next) => {
  res.render("../views/movie/actor/add_actor.ejs");
};

exports.addDirectors = async (req, res, next) => {
  res.render("../views/movie/directors/add_directors.ejs");
};

exports.listActor = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/actors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const actors = response.data.getAll;
    res.render("../views/movie/actor/list_actor.ejs", { actors, apiUrl });

    console.log("check", actors);
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createActor = async (req, res, next) => {
  const { name } = req.body;
  const image = req.file;

  if (!name || !image) {
    return res.status(400).json({ error: "Tên và ảnh là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", fs.createReadStream(image.path), {
      filename: image.originalname,
    });

    const response = await axios.post(`${apiUrl}/actors`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }
    res.render("../views/movie/actor/add_actor.ejs", {
      success: "Tạo actor thành công!",
      actor: response.data.actor,
    });
  } catch (error) {
    res.render("../views/movie/actor/add_actor.ejs", {
      error: "Đã xảy ra lỗi khi tạo actor.",
    });
    console.log(error);
  }
};

exports.updateActor = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file;

  if (!name && !image) {
    return res
      .status(400)
      .json({ error: "Tên hoặc ảnh là bắt buộc để cập nhật." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (image) {
      formData.append("image", fs.createReadStream(image.path));
    }

    const response = await axios.put(`${apiUrl}/actors/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.deleteActor = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.delete(`${apiUrl}/actors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.listDirector = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/directors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const directors = response.data;
    res.render("../views/movie/directors/list_directors.ejs", {
      directors,
      apiUrl,
    });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createDirector = async (req, res, next) => {
  const { name } = req.body;
  const image = req.file;

  if (!name || !image) {
    return res.status(400).json({ error: "Tên và ảnh là bắt buộc." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", fs.createReadStream(image.path), {
      filename: image.originalname,
    });

    const response = await axios.post(`${apiUrl}/directors`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
        // Đặt Header động: Để Axios tự động đặt header cho multipart/form-data
        // bằng cách không đặt thủ công Content-Type.
      },
    });

    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }

    res.render("../views/movie/directors/add_directors.ejs", {
      success: "Tạo directors thành công!",
      director: response.data.director,
    });
  } catch (error) {
    res.render("../views/movie/directors/add_directors.ejs", {
      error: "Đã xảy ra lỗi khi tạo directors.",
    });
    console.log(error);
  }
};
exports.updateDirecters = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file;

  if (!name && !image) {
    return res
      .status(400)
      .json({ error: "Tên hoặc ảnh là bắt buộc để cập nhật." });
  }

  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (image) {
      formData.append("image", fs.createReadStream(image.path));
    }

    const response = await axios.put(`${apiUrl}/directors/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.deleteDirector = async (req, res, next) => {
  const id = req.params.id;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.delete(`${apiUrl}/directors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
exports.listDirectorOption = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/directors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const directors = response.data.data.getAll;
    res.json({ success: true, getAll: directors });

    console.log("check", directors);
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.listActorOption = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/actors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const actors = response.data.getAll;
    res.json({ success: true, getAll: actors });

    console.log("check", actors);
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.genreListOption = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;

    const response = await axios.get(`${apiUrl}/genres`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const genres = response.data;

    res.json({ success: true, getAll: genres });
    console.log("check", genres);
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
