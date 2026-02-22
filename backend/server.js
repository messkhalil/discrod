import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

let games = {}; // مؤقتاً لتخزين الغرف

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("joinGame", ({ gameId, player }) => {
        if (!games[gameId]) games[gameId] = { players: [] };
        games[gameId].players.push(player);
        io.to(gameId).emit("updateGame", games[gameId]);
        socket.join(gameId);
    });

    socket.on("playCard", ({ gameId, card, player }) => {
        // تحديث اللعبة في الذاكرة أو Firebase
        io.to(gameId).emit("cardPlayed", { card, player });
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
    });
});

app.get("/", (req, res) => res.send("UNO Backend Running"));

httpServer.listen(5000, () => console.log("Server running on port 5000"));