var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var crypto = require("crypto");
var session = require("express-session");
var bodyParser = require("body-parser");
var expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

var dashboardRouter = require("./routes/dashboard");
var employeeRouter = require("./routes/employee");
var customerRouter = require("./routes/customer");
var ticketsRouter = require("./routes/tickets");
var movieRouter = require("./routes/movie");
var seatRouter = require("./routes/seat");
var cinemaRouter = require("./routes/cinema");
var discountRouter = require("./routes/discount");
var serviceRouter = require("./routes/service");
var loginRouter = require("./routes/login");
var tokenRouter = require("./routes/token");
var genreRouter = require("./routes/genre");
var showtimeRouter = require("./routes/showtime");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  // console.log("session middleware:", req.session);
  next();
});

app.use("/", loginRouter);
app.use(expressLayouts);
app.use("/token", tokenRouter);
app.use("/dashboard", dashboardRouter);
app.use("/employee", employeeRouter);
app.use("/customer", customerRouter);
app.use("/tickets", ticketsRouter);
app.use("/movie", movieRouter);
app.use("/seat", seatRouter);
app.use("/cinema", cinemaRouter);
app.use("/discount", discountRouter);
app.use("/service", serviceRouter);
app.use("/genre", genreRouter);
app.use("/showtime", showtimeRouter);

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
