const express = require("express");
const router = express.Router();

const db = require("../../db");
const { route } = require("..");

router.get("/", (req, res) => {
    res.render("admin/categories/index", {
        layout: "admin/layout"
    });
});