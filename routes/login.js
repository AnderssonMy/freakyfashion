const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
    res.render("pages/login", {title: "Logga in", });
});

router.post("/", (req, res) => {
    const {email, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);

    if (!user) {
        return res.render("pages/login", {
            title: "Logga in",
            error: "Fel e-post eller lösenord"
        });
    }

    req.session.user = {
        id: user.id,
        email: user.email, 
        is_admin: user.is_admin
    };

    res.redirect("/");
});

module.exports = router; 