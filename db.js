const Database = require("better-sqlite3");
const db = new Database("./data/freakyfashion.db");

module.exports = db;