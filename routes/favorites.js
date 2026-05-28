const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", function (req, res, next) {

  const allProducts = db.prepare('SELECT * FROM products').all();

  let favoriteIds = [];
  if (req.session.user) {
    const rows = db.prepare('SELECT product_id FROM favorites WHERE user_id = ?').all(req.session.user.id);
    favoriteIds = rows.map(row => row.product_id);
  } else {
    favoriteIds = req.session.favorites || [];
  }

  const favoriteProducts = allProducts.filter(product => {
    const stringIds = favoriteIds.map(id => id.toString());
    return stringIds.includes(product.id.toString());
  });

  const visibleProducts = favoriteProducts.map(product => {
    return {
      ...product,
      isFavorite: true
    };
  });

  res.render("pages/favorites", { title: "Freaky Fashion", products: visibleProducts });
});

function addFavorite(req, productId) {
  if (req.session.user) {

    db.prepare('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)').run(req.session.user.id, productId);

  } else {

    if (!req.session.favorites) req.session.favorites = [];
    if(!req.session.favorites.includes(productId)) {
      req.session.favorites.push(productId);
    }
  }
}


function deleteFavorite(req, productId) {
  if (req.session.user) {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?').run(req.session.user.id, productId);
  } else {
    if (req.session.favorites) {
      req.session.favorites = req.session.favorites.filter(id => id !== productId);
    }
  }
}

router.post("/", (req, res) => {
    const {productId, action} = req.body;

    if (action === 'add') {
      addFavorite(req, productId);

    } else if (action === 'remove') {
      deleteFavorite(req, productId);
    }

    res.json({success: true});
});

module.exports = router; 