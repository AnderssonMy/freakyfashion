var express = require("express");
var router = express.Router();

const Database = require("better-sqlite3");
const db = new Database("./data/freakyfashion.db");

const hero = require("../data/hero.mock");
const spots = require("../data/spots.mock");

/* GET home page. */
router.get("/", function (req, res, next) {
  const products = db.prepare("SELECT * FROM products").all();

  const today = new Date();

  const visibleProducts = products.map(product => {
    const publishedDate = new Date(product.published_at);

    const diffInDays = (today - publishedDate) / (1000 * 60 * 60 * 24);

    return {
      ...product,
      isNew: diffInDays <= 7
    };
  });

  res.render("index", { title: "Freaky Fashion", hero, spots, products: visibleProducts });
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

  const product = db
  .prepare("SELECT * FROM products WHERE slug = ?").get(slug);

  if (!product) {
    return res.status(404).send("Produkten kunde inte hittas");
  }

  const similar_products = db.prepare('SELECT * FROM products WHERE category_id = ? AND id != ? LIMIT 5').all(product.category_id, product.id);

  res.render("pages/products", {title: product.name, product, similar_products });
});


module.exports = router;
