const pool = require("../configDB");

const getCategoriesCampaigns = async () => {
    try {
        const categories = await pool.query(`SELECT * FROM campaign_categories`);

        return categories.rows;
    } catch (error) {
        console.log(error);
    }
};

const insertCampaign = async (campaignData) => {
    try {
        const query = `
            INSERT INTO campaigns 
            (creator_id, title, description, goal_amount, start_date, end_date, campaign_image, category_id) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const values = [
            campaignData.creator_id,
            campaignData.title,
            campaignData.description,
            campaignData.goal_amount,
            campaignData.start_date,
            campaignData.end_date || null,
            campaignData.campaign_image || null,
            campaignData.category || null
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting campaign:", error);
        throw new Error("Database error");
    }
};

module.exports = {
    getCategoriesCampaigns,
    insertCampaign,
};
