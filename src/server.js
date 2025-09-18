import http from "http";
import { Server } from "socket.io";
import "dotenv/config"

const HTTPServer = http.createServer();
const port = process.env.PORT || 3000;

const io = new Server(HTTPServer);

io.on("connection", (socket) => {
    console.log(`Cliente ${socket.id} conectado!`);

    socket.on("message", (message) => {
        socket.broadcast.emit("message-client", message);
    });
});

HTTPServer.listen(port, () => console.log("Server is running on port " + port));