const jwt = require("jsonwebtoken");
const passport = require("../config/passportConfig");
require("dotenv").config();

const { getInfoFilter, insertUser } = require("../models/query/usersQuery");
const hashPassword = require("../utils/hashPassword");

// Login with local
const loginWithLocal = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ error: "Internal server error", details: err });

        if (!user) return res.status(401).json({ message: info.message });

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            error: 0,
            message: "Login successful",
            user: {
                user_id: user.user_id,
                email: user.email
            }
        });
    })(req, res, next);
};

// Login with Google
const loginWithGoogle = (req, res) => {
    const user = req.user;
    if (!user) return res.status(500).json({ error: 1, message: "Server is broken" });

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
        error: 0,
        message: "Login successful",
        user: {
            user_id: user.user_id,
            email: user.email
        }
    });
};

const signUpAccount = async (req, res) => {
    const { email, password, full_name, phone } = req.body;

    try {
        if (!email || !password || !full_name || !phone)
            return res.status(400).json({ error: 1, message: "Missing some required fields" });

        const isExisted = await getInfoFilter([{ email }]);

        if (isExisted.length === 1)
            return res.json({ error: 1, message: "This email has been existed" });

        const hashedPassword = await hashPassword(password);

        const result = await insertUser([
            { email },
            { password_hash: hashedPassword },
            { full_name },
            { phone }
        ]);

        return res.json({ error: 0, message: "Successfully", results: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 1, message: "Server is broken!" });
    }
};

module.exports = {
    loginWithLocal,
    loginWithGoogle,
    signUpAccount,
};
