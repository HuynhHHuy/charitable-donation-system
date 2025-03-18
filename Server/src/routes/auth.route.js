const router = require("express").Router();
const passport = require("../config/passportConfig")

const authController = require("../controllers/authController")

// login with LOCAL /api/auth/login/local [POST]
router.post("/login/local", authController.loginWithLocal);

// login with GOOGLE /api/auth/login/google
router.get("/login/google", passport.authenticate('google', { scope: ['profile', 'email'], session: false }))

router.get("/login/google/callback", 
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }),
    authController.loginWithGoogle
)

// check login status /api/auth/login/check
router.get("/login/check", authController.checkLogin)

// register /api/auth/register
router.post("/register", authController.signUpAccount)

module.exports = router
