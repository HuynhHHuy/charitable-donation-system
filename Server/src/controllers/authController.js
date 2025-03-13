const jwt = require("jsonwebtoken");
const passport = require("../config/passportConfig");
require("dotenv").config();

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

module.exports = {
    loginWithLocal,
};
