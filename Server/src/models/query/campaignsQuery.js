const pool = require("../configDB")

const getCategoriesCampaigns = async () => {
    try {
        const categories = await pool.query(`SELECT * FROM campaign_categories`)
        
        return categories.rows
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategoriesCampaigns,
}