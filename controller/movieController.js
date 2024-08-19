const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

exports.movieList = async (req, res, next) => {
  res.render("../views/movie/list_movie.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.movieListTable = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const page = req.query.page || 1;
    const response = await axios.get(`${apiUrl}/movies/admin?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movies = response.data.getall;
    res.json({ success: true, getAll: movies });
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addMovie = async (req, res, next) => {
  res.render("../views/movie/add_movie.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
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

exports.updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const { name, duration, subtitle, censorship, rate, release_date } = req.body;
  const token = req.session.admin.token;
  const apiUrl = process.env.API_URL;
  const image = req.file;
  if (!name || !duration || !subtitle || !censorship || !rate || !release_date || !image) {
    return res.status(400).json({ error: "Tất cả các trường là bắt buộc." });
  }

  try {
    // Tạo FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("subtitle", subtitle);
    formData.append("censorship", censorship);
    formData.append("rate", rate);
    formData.append("release_date", release_date);
    formData.append("image", fs.createReadStream(image.path), {
      filename: image.originalname,
    });

    const response = await axios.put(`${apiUrl}/movies/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });
    if (req.file && req.file.fieldname === "image") {
      fs.unlinkSync(req.file.path);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Lỗi khi cập nhật phim:", error.message);
    res.status(500).json({ success: false, error: "Đã xảy ra lỗi khi cập nhật." });
  }
};

exports.updateStatus = async (req, res, next) => {
  const { movieId } = req.params; // Lấy ID từ tham số yêu cầu
  try {
    const token = req.session.admin.token; // Lấy token từ session
    const apiUrl = process.env.API_URL; // Lấy URL của API từ biến môi trường

    // Gửi yêu cầu PUT để cập nhật trạng thái phim
    const response = await axios.put(
      `${apiUrl}/movies/stopshows/${movieId}`,
      {}, // Payload rỗng nếu bạn không cần gửi dữ liệu trong body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thiết lập headers với token
        },
      }
    );

    if (response.status === 200) {
      // Trạng thái đã được cập nhật thành công
      return res.status(200).json({ message: "Trạng thái đã được cập nhật thành công." });
    } else {
      // Nếu response từ server không phải 200, trả về lỗi từ server
      return res.status(response.status).json({ error: response.data.error || "Lỗi từ server." });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật trạng thái." });
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
  res.render("../views/movie/actor/add_actor.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.addDirectors = async (req, res, next) => {
  res.render("../views/movie/directors/add_directors.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
exports.listActor = async (req, res, next) => {
  res.render("../views/movie/actor/list_actor.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};
exports.listActorTable = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const page = req.query.page || 1;
    const response = await axios.get(`${apiUrl}/actors?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const actors = response.data.getAll;

    res.json({ success: true, getAll: actors });
  } catch (error) {
    console.log(error);
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
    return res.status(400).json({ error: "Tên hoặc ảnh là bắt buộc để cập nhật." });
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
  res.render("../views/movie/directors/list_directors.ejs", {
    layout: path.join(__dirname, "../layouts/dashboard.ejs"),
  });
};

exports.listDirectorTable = async (req, res, next) => {
  try {
    const token = req.session.admin.token;
    const apiUrl = process.env.API_URL;
    const page = req.query.page || 1;
    const response = await axios.get(`${apiUrl}/directors?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const directors = response.data;

    res.json({ success: true, getAll: directors });
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
    return res.status(400).json({ error: "Tên hoặc ảnh là bắt buộc để cập nhật." });
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
  } catch (error) {
    console.log(error);

    // Trả về thông báo lỗi
    res.status(500).json({ success: false, error: error.message });
  }
};
