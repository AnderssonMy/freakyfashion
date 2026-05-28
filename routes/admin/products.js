const express = require("express");
const router = express.Router();

const db = require("../../db");

function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.is_admin !==1) {
        return res.status(404).send("Du kan tyvärr inte komma åt denna sida");
    }

    next();
}

router.use(requireAdmin);

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