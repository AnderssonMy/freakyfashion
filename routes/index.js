var express = require("express");
var router = express.Router();
const products = require("../data/products.mock");

/* GET home page. */
router.get("/", function (req, res, next) {
  const today = new Date();

  const visibleProducts = products
  .filter(product => {
    return new Date(product.publishedAt) <= today;
  })
  .map(product => {
    const publishedDate = new Date(product.publishedAt);

    const diffInDays = (today - publishedDate) / (1000 * 60 * 60 * 24);

    return {
      ...product,
      isNew: diffInDays <= 7
    };
  });


  res.render("index", { title: "Freaky Fashion", products: visibleProducts });
});


// static pages

router.get("/search", (req, res) => {
  const query = req.query.q;

  res.render("pages/search", { title: "Freaky Fashion", query });
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
