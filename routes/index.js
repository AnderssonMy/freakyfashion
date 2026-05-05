var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {

  //hämta produkter från databas

  res.render("index", { title: "Freaky Fashion" });
});

// static pages

router.get("/search", (req, res) => {
  res.render("pages/search", { title: "Freaky Fashion" });
});

router.get("/favorites", (req, res) => {
  res.render("pages/favorites", { title: "Freaky Fashion" });
});

router.get("/news", (req, res) => {
  res.render("pages/news", { title: "Freaky Fashion" });
});

router.get("/basket", (req, res) => {
  res.render("pages/basket", { title: "Freaky Fashion" });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Freaky Fashion" });
});


// dynamic pages
router.get("/categories/:slug", (req, res) => {
  const slug = req.params.slug;

  res.render("pages/categories", {title: "Freaky Fashion", slug });
});

router.get("/products/:slug", (req, res) => {
  const slug = req.params.slug;

  res.render("pages/products", {title: slug });
});


module.exports = router;
