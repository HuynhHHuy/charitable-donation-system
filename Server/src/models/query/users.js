const pool = require("../configDB")

const getAllInfo = async (data) => {    
    try {
        const pairs = data.reduce((acc, curr) => {
            const key = Object.keys(curr)[0]
            const value = curr[key];

            const formattedValue = typeof value === "string" ? `'${value}'` : value;

            return acc + `${key}=${formattedValue} AND `;
        }, "").slice(0, -5);        
        
        const userInfo = await pool.query(`SELECT * FROM users WHERE ${pairs}`)

        return userInfo.rows
    } catch (error) {
        console.log(error);
    }
}

const insertUser = async (data) => {
    try {
        const fields = data.map(obj => Object.keys(obj)[0]);

        const values = data.map(obj => Object.values(obj)[0]);

        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

        const query = `INSERT INTO users (${fields.join(", ")}) VALUES (${placeholders}) RETURNING *`;

        const result = await pool.query(query, values);

        return result.rows[0]
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllInfo,
    insertUser,
}
