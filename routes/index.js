var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');

const db = new Database('./data/freakyfashion.db', {
  verbose: console.log
});

/* GET home page. */
router.get('/', function(req, res, next) {

  const select = db.prepare('SELECT * FROM categories');
  const categories = select.all();


  res.render('index', { title: 'Freaky Fashion', categories: categories });
});

module.exports = router;
