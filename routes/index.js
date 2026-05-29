var express = require("express");
var router = express.Router();

const db = require("../db");

/* GET home page. */
router.get("/", function (req, res, next) {

  const hero = db.prepare("SELECT * FROM hero WHERE id = ?").get(1);

  const products = db.prepare("SELECT * FROM products WHERE is_popular = ?").all(1);

  const spots = db.prepare("SELECT * FROM spots").all();

  const today = new Date();

  const visibleProducts = products.map((product) => {
    const publishedDate = new Date(product.published_at);

    const diffInDays = Math.floor((today - publishedDate) / (1000 * 60 * 60 * 24)
  );

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
