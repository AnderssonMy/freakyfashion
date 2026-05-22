const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/:slug", (req, res) => {
  const slug = req.params.slug;

  const category = db
    .prepare("SELECT * FROM categories WHERE slug = ?")
    .get(slug);

  if (!category) {
    return res.status(404).send("Kategorin kunde inte hittas");
  }

  const products = db
    .prepare("SELECT * FROM products WHERE category_id = ?")
    .all(category.id);

  res.render("pages/categories", {
    title: "Freaky Fashion",
    slug,
    category,
    products,
  });
});

module.exports = router; 