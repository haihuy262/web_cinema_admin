var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var crypto = require("crypto");
var session = require("express-session");

var dashboardRouter = require("./routes/dashboard");
var employeeRouter = require("./routes/employee");
var customerRouter = require("./routes/customer");
var orderRouter = require("./routes/order");
var movieRouter = require("./routes/movie");
var charRouter = require("./routes/char");
var cinemaRouter = require("./routes/cinema");
var discountRouter = require("./routes/discount");
var serviceRouter = require("./routes/service");
var loginRouter = require("./routes/login");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const secretKey = crypto.randomBytes(32).toString("hex");

app.use(
  session({
    secret: "d9e12b2b2cc0c081f091c859fac2f802377b5e6eb92208390708c49f1c6a169f",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to log session for debugging
app.use((req, res, next) => {
  console.log("session middleware:", req.session);
  next();
});

app.use("/", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/employee", employeeRouter);
app.use("/customer", customerRouter);
app.use("/order", orderRouter);
app.use("/movie", movieRouter);
app.use("/char", charRouter);
app.use("/cinema", cinemaRouter);
app.use("/discount", discountRouter);
app.use("/service", serviceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
