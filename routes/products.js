const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/:slug", (req, res) => {
  const slug = req.params.slug;

  const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(slug);

  if (!product) {
    return res.status(404).send("Produkten kunde inte hittas");
  }

  const similar_products = db
    .prepare("SELECT * FROM products WHERE category_id = ? AND id != ? LIMIT 5")
    .all(product.category_id, product.id);

  res.render("pages/products", {
    title: product.name,
    product,
    similar_products,
  });
});

module.exports = router;