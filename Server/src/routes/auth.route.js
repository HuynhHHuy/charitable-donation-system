const router = require("express").Router();

const authController = require("../controllers/authController")

// login with LOCAL /api/auth/login/local [POST]
router.post("/login/local", authController.loginWithLocal);

// register /api/auth/register
router.post("/register", authController.signUpAccount)


module.exports = router
