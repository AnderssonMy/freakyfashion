const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const query = req.query.q || "";

  const category = db
    .prepare("SELECT id FROM categories WHERE name LIKE ?")
    .get(`%${query}%`);

  let products;

  if (category) {
    products = db
      .prepare("SELECT * FROM products WHERE category_id = ?")
      .all(category.id);
  } else {
    products = db
      .prepare("SELECT * FROM products WHERE name LIKE ?")
      .all(`%${query}%`);
  }

  res.render("pages/search", { title: "Freaky Fashion", query, products });
});

module.exports = router;
