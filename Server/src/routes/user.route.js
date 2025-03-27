const router = require("express").Router();

const userController = require("../controllers/userController");
const verifyLogIn = require("../middlewares/auth/verifyLogIn");

// get user info /api/user
router.get("/", verifyLogIn, userController.getUser);

module.exports = router;
