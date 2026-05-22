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

  console.log(email, password);

  res.redirect('back');
}); 

module.exports = router; 