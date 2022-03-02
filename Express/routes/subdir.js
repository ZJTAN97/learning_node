const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
})

router.get("/new", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "new.html"));
})

module.exports = router;