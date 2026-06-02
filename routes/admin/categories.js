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

router.post("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.prepare("DELETE FROM categories WHERE id = ?").run(id);

    res.redirect("/admin/categories");
});

module.exports = router;