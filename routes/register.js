const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  res.render("pages/register", { title: "Skapa konto | Freaky Fashion" });
});

router.post("/", (req, res) => {
  const {
    email, 
    password
  } = req.body;

try {
  const newUser = db.prepare (`INSERT INTO users (email, password, is_admin) VALUES (?, ?, 0)`).run(email, password);

  req.session.user = {
    id: newUser.lastInsertRowid,
    email,
    is_admin: 0
  };

  res.redirect('/');

} catch (error) {
  if (error.message.includes('UNIQUE')) {
    return res.render("pages/register", {
      title: "Skapa konto | Freaky Fashion", 
      error: "Du är redan registrerad. Logga in."

  });
  }

  console.error(error);
  res.status(500).render("pages/register",{ title: "Skapa konto | Freaky Fashion", 
    error: "Ett oväntat fel uppstod"
  }); 
}
});

module.exports = router; 