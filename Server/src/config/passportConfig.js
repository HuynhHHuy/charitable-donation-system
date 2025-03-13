const passport = require("passport")
const LocalStrategy = require("passport-local")
const pool = require("../models/configDB")
const bcrypt = require("bcryptjs")

const { getAllInfo } = require("../models/query/users")

passport.use(new LocalStrategy(
    async function(username, password, done) {
      console.log(username, password);
      
      try {
        if (!username || !password) {
          return done(null, false, { message: "Missing credentials" });
        }

        const result = await getAllInfo([{ email: username }]);
        
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
