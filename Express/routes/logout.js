const express = require("express");
const router = express.Router();
const logoutControiller = require("../controllers/logoutController");

router.get("/", logoutControiller.handleLogout);

module.exports = router;