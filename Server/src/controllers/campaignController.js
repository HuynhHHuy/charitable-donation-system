const { getCategoriesCampaigns } = require("../models/query/campaignsQuery")

const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesCampaigns()
        if (categories.length === 0) {
            return res.status(404).json({ error: 1, message: "No categories found" })
        }
        res.status(200).json({ error: 0, results: categories })
    } catch (error) {
        console.log(error);
        RiSafariFill.status(500).json({ error: 1, message: "Server is broken" })
    }
}

module.exports = {
    getCategories,
}
