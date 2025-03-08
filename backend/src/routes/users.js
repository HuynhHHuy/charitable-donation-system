var express = require("express");
var router = express.Router();

const usersController = require("../controllers/UsersController");

/* GET users listing. */
router.get("/", usersController.get);

module.exports = router;
