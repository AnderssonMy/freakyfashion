var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
var session = require("express-session");

const db = require("./db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var searchRouter = require("./routes/search");
var favoritesRouter = require("./routes/favorites");
var newsRouter = require("./routes/news");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var basketRouter = require("./routes/basket");
var registerRouter = require("./routes/register");
var adminProd = require("./routes/admin/products");
var adminCat = require("./routes/admin/categories");

var app = express();

app.use(session({
  secret: 'supersecretradomstring',
  saveUninitialized: false, 
  resave: false,
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//layout
app.use(expressLayouts);
app.set("layout", "layout");

app.use("/admin", (req, res, next) => {
  res.locals.layout = "admin/layout";
  next ();
});

app.use((req, res, next) => {
  if (req.path.startsWith("/admin")) {
    return next ();
  }

  res.locals.categories = db.prepare("SELECT * FROM categories").all();
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);
app.use("/favorites", favoritesRouter);
app.use("/news", newsRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/basket", basketRouter);
app.use("/register", registerRouter);
app.use("/admin/products", adminProd);
app.use("/admin/categories", adminCat);


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
