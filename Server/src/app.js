var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config()

const authRoute = require("./routes/auth.route")

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is runnig at PORT", process.env.PORT);
})
