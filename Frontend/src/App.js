import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { db } from "./firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const socket = io("http://localhost:5000");

function App() {
  const [players, setPlayers] = useState([]);
  const [gameId, setGameId] = useState("room1");

  useEffect(() => {
    // استماع للتغييرات في Firebase (مثال)
    const unsub = onSnapshot(collection(db, "games"), (snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log("Game data:", doc.data());
      });
    });

    return () => unsub();
  }, []);

  const joinGame = () => {
    const player = { id: Math.random().toString(36).substr(2, 5), name: "Player1" };
    socket.emit("joinGame", { gameId, player });
  };

  socket.on("updateGame", (game) => {
    setPlayers(game.players);
  });

  return (
    <div>
      <h1>UNO 3D Game</h1>
      <button onClick={joinGame}>Join Game</button>
      <ul>
        {players.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
}

export default App;