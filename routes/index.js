var express = require("express");
var router = express.Router();

const db = require("../db");

const spots = require("../data/spots.mock");

/* GET home page. */
router.get("/", function (req, res, next) {

  const hero = db.prepare("SELECT * FROM hero WHERE id = ?").get(1);

  const products = db.prepare("SELECT * FROM products WHERE is_popular = ?").all(1);

  const today = new Date();

  const visibleProducts = products.map((product) => {
    const publishedDate = new Date(product.published_at);

    const diffInDays = (today - publishedDate) / (1000 * 60 * 60 * 24);

    return {
      ...product,
      isNew: diffInDays <= 7,
    };
  });

  res.render("index", {
    title: "Freaky Fashion",
    hero,
    spots,
    products: visibleProducts,
  });
});

module.exports = router;
