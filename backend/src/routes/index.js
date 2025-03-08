var express = require("express");
var router = express.Router();

const homeController = require("../controllers/HomeController");

/* GET home page. */
router.get("/", homeController.get);

module.exports = router;
