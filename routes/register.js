const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  res.render("pages/register", { title: "Freaky Fashion" });
});

router.post("/", (req, res) => {
  const {
    email, 
    password
  } = req.body;


  const newUser = db.prepare (`INSERT INTO users (email, password, is_admin) VALUES (?, ?, 0)`).run(email, password);

  req.session.user = {
    id: newUser.lastInsertRowid,
    email,
    is_admin: 0
  };

  res.redirect('/');
}); 

module.exports = router; 