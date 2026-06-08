const express = require("express");
const router = express.Router();
const upload = require("./uploads");

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

router.post("/delete/:id", (req,res) => {
    const id = req.params.id;

    db.prepare("DELETE FROM products WHERE id = ?").run(id);

    res.redirect("/admin/products");
});

router.post("/new",upload.single("image"), (req, res) => {
     
    const {name, description, brand, SKU, price, published_at, category_id} = req.body;

    const image = req.file ? "/images/products/" + req.file.filename : null;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    db.prepare(`INSERT INTO products (name, slug, description, price, brand, image, published_at, SKU, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(name, slug, description, price, brand, image, published_at, SKU, category_id);

    res.redirect("/admin/products/new");
});

module.exports = router;