const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ejs = require("ejs");
require("dotenv").config();

const { setupSocket } = require("./config/socket");
const app = express();
const server = http.createServer(app); // Tạo server HTTP

setupSocket(server);

// Ejs config
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

// Router
const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT}`);
});
