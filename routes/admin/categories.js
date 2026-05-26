const express = require("express");
const router = express.Router();

const db = require("../../db");

router.get("/", (req, res) => {

    const categories = db.prepare(`SELECT * FROM categories`).all();

    res.render("admin/categories/index", {
        title: "Administration",
        categories
    });
});

router.get("/new", (req, res) => {
    res.render("admin/categories/new", {
        title: "Administration"
    });
});

module.exports = router;