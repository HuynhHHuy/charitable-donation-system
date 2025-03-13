const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
})

pool.connect()
    .then(() => console.log("Data base has been connected!"))
    .catch((error) => console.log(error))

module.exports = pool;
