var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Router
const authRouter = require("./routes/auth.route");

// app.use(logger("dev"));
app.use(express.json());

// Middleware to parse JSON & URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Config public route
app.use(express.static(path.join(__dirname, "public")));

// Config cors policies
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use("/api/auth", authRouter);

module.exports = app;