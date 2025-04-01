const { getCategoriesCampaigns } = require("../models/query/campaignsQuery");

const { insertCampaign } = require("../models/query/campaignsQuery");

const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesCampaigns();
        if (categories.length === 0) {
            return res.status(404).json({ error: 1, message: "No categories found" });
        }
        res.status(200).json({ error: 0, results: categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 1, message: "Server is broken" });
    }
};

const createCampaign = async (req, res) => {
    try {
        const campaignData = {
            creator_id: req.user.user_id,
            title: req.body.title,
            description: req.body.description,
            goal_amount: req.body.goal_amount,
            start_date: req.body.start_date || null,
            end_date: req.body.end_date || null,
            campaign_image: req.file?.path,
            category: req.body.category
        };

        const newCampaign = await insertCampaign(campaignData);

        if (!newCampaign) return res.status(500).json({ error: 1, message: "Server is broken" });

        return res.json({ error: 0, message: "Create successfully" })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 1, message: "Server is broken" });
    }
};

module.exports = {
    getCategories,
    createCampaign
};
