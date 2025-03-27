const { getInfoFilter } = require("../models/query/usersQuery");

const getUser = async (req, res) => {
    const filters = req.query;

    try {
        if (Object.keys(filters).length === 0) return res.json({ error: 0, results: [] });

        const keys = Object.keys(filters);
        const valuesQuery = keys.map((key) => {
            return {
                [keys]: filters[key]
            };
        });

        let userInfo = await getInfoFilter(valuesQuery);

        if (userInfo.length > 0) {
            userInfo = userInfo.map((user) => ({
                ...user,
                password_hash: ""
            }));
        }

        res.json({ error: 0, results: userInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 1, message: "Server is broken" });
    }
};

module.exports = {
    getUser
};
