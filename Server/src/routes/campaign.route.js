const router = require("express").Router();

const verifyLogIn = require("../middlewares/auth/verifyLogIn");
const campaignController = require("../controllers/campaignController");
const upload = require("../middlewares/storeImgCloud/index");

// get categories campaigns /api/campaigns/categories [GET]
router.get("/categories", campaignController.getCategories);

// creata a new campaign /api/campaigns/create [POST]
router.post(
    "/create",
    verifyLogIn,
    upload.single("campaign_image"),
    campaignController.createCampaign
);

module.exports = router;
