const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const products = db
    .prepare(
      "SELECT * FROM products WHERE published_at BETWEEN datetime('now', '-7 days') AND datetime ('now') ORDER BY published_at DESC;",
    )
    .all();

  res.render("pages/news", { title: "Freaky Fashion", products });
});

module.exports = router;