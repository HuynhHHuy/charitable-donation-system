const router = require("express").Router();

const campaignController = require("../controllers/campaignController")

// get categories campaigns /api/campaigns/categories
router.get("/categories", campaignController.getCategories)

module.exports = router;