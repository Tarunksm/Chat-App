"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => console.log("Connected to Websocket server");

    socket.onmessage = (event) => {
      console.log(event.data);
    };

    socket.onclose = () => console.log("Websocket connection closed");

    return () => {
      socket.close();
    };
  }, []);
  return (
    <main>
      <h1>Chat App</h1>
      <input
        value={message}
        type="text"
        onChange={(e) => setMessage(e.target.value)}
      />
    </main>
  );
}
