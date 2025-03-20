const { Server } = require("socket.io");

const { verifySignUp } = require("../utils/sockets/verifySignUp");

let io;

const setupSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
            methods: ["GET", "POST", "PATCH", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }
    });

    verifySignUp(io);

    return io;
};

const getIo = () => {
    if (!io) {
        console.log("IO has not been inited");
        return;
    }
    return io;
};

module.exports = { getIo, setupSocket };
