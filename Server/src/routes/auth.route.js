const router = require("express").Router();

const authController = require("../controllers/authController")

// login route /api/auth/login [POST]
router.post("/login", authController.loginAuth);

module.exports = router
