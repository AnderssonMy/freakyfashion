const express = require("express");
const router = express.Router();

const db = require("../../db");

router.get("/", (req, res) => {

    const products = db.prepare(`SELECT * FROM products`).all();

    res.render("admin/products/index", {
        title: "Administration",
        products
    });
});

router.get("/new", (req, res) => {

    const categories = db.prepare(`SELECT * FROM categories`).all();

    res.render("admin/products/new", {
        title: "Administration", 
        categories
    });
});

module.exports = router;