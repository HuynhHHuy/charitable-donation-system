const jwt = require("jsonwebtoken");
const passport = require("../config/passportConfig");
require("dotenv").config();

const { getAllInfo, insertUser } = require("../models/query/users")
const hashPassword = require("../utils/hashPassword")

const loginWithLocal = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ error: "Internal server error", details: err });

        if (!user) return res.status(401).json({ message: info.message });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login successful",
            token: token,
            user: {
                user_id: user.user_id,
                email: user.email,
            }
        });
    })(req, res, next);
};

const signUpAccount = async (req, res) => {
    const { email, password, full_name, phone } = req.body;

    try {
        if (!email || !password || !full_name || !phone) return res.status(400).json({ error: 1, message: "Missing some required fields" })

        const isExisted = await getAllInfo([{ email }])
        
        if (isExisted.length === 1) return res.json({ error: 1, message: "This email has been existed" })
        
        const hashedPassword = await hashPassword(password)

        const result = await insertUser([{ email }, { password_hash: hashedPassword }, { full_name }, { phone }])

        return res.json({ error: 0, message: "Successfully", results: result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 1, message: "Server is broken!" })
    }
}

module.exports = {
    loginWithLocal,
    signUpAccount,
};
