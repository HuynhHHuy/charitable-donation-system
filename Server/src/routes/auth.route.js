const router = require("express").Router();
const pool = require("../models/configDB")

const authController = require("../controllers/authController")

// login with LOCAL /api/auth/login/local [POST]
router.post("/login/local", authController.loginWithLocal);

module.exports = router
