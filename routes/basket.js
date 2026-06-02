const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  
  const allProducts = db.prepare("SELECT * FROM products").all();

  const basket = req.session.basket || [];

  if (basket.length === 0) {
    return res.render("pages/basket", {title: "Kassan", products: [], empty: true});
  }

  const products = basket.map(item => {

    const product = allProducts.find(p => p.id.toString() === item.productId);

  return {
    ...product, quantity: item.quantity, total: product.price * item.quantity
  };
});

  res.render("pages/basket", { title: "Kassan", products, empty: false 
  });
});


router.post("/", (req, res) => {

  const productId = req.body.productId;

  if (!req.session.basket) {
    req.session.basket = [];
  }


  const existingProduct = req.session.basket.find(item => item.productId === productId);

  if (!existingProduct) {
    req.session.basket.push({
      productId,
      quantity: 1
    });
  }

  res.redirect("back");
});

router.post("/update", (req, res) => {
  const productId = req.body.productId;
  const quantity = Number(req.body.quantity);

  const basket = req.session.basket || [];

  const item = basket.find(p => p.productId === productId);

  if (item) {
    item.quantity = quantity;
  }

  res.redirect("/basket");
});

router.post("/delete", (req, res) => {
  const productId = req.body.productId;

  const basket = req.session.basket || [];

  req.session.basket = basket.filter(item => item.productId !== productId);

  res.redirect("/basket");
});

module.exports = router;