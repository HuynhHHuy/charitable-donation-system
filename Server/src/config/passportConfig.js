const passport = require("passport")
const LocalStrategy = require("passport-local")
const pool = require("../models/configDB")
const bcrypt = require("bcryptjs")

passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        if (!username || !password) {
          return done(null, false, { message: "Missing credentials" });
        }

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [username]);
        
        if (result.rows.length === 0) return done(null, false, { message: "Username not found" })

        const isMatch = await bcrypt.compare(password, result.password);

        if (!isMatch) return done(null, false, { message: "Password is incorrect" })

        return done(null, result.rows[0]);

      } catch (error) {
        return done(error);
      }
    }
));

module.exports = passport;
