"use client";

import { useEffect, useState, useRef } from "react";
import type { ServerEvent } from "@/types/message";
import { Navbar } from "./Navbar";

export function Chat({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) {
  const [messages, setMessages] = useState<ServerEvent[]>([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef<WebSocket>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket("https://web-socket-server-nzsa.onrender.com");

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to Websocket server");
      const joinEvent = {
        type: "join",
        username,
        userId,
      };
      socket.send(JSON.stringify(joinEvent));
    };

    socket.onmessage = (event) => {
      const messageEvent: ServerEvent = JSON.parse(event.data);
      if (messageEvent.type === "message_history") {
        setMessages(messageEvent.messages);
        return;
      }
      setMessages((prev) => [...prev, messageEvent]);
      console.log(messageEvent);
    };

    socket.onerror = (error) => {
      console.log("Websocket error: ", error);
    };

    socket.onclose = () => {
      console.log("Websocket connection closed!");
    };
    return () => {
      socket.close();
    };
  }, [username, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const chatMessage = {
      type: "chat",
      message,
    };
    if (chatMessage.message.trim() === "") {
      return;
    }
    socketRef.current?.send(JSON.stringify(chatMessage));

    setMessage("");
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <section className="flex h-150 w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
          <header className="border-b px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Chat App</h1>
            <p className="text-sm text-gray-500">Logged in as {username}</p>
          </header>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {messages.map((event) => {
                if (event.type === "chat") {
                  if (event.username === username) {
                    return (
                      <div key={event.id} className="flex justify-end">
                        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-black px-4 py-2 text-white">
                          {event.message}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={event.id} className="flex justify-start">
                        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-gray-200 px-4 py-2 text-gray-900">
                          <p className="mb-1 text-xs font-medium text-gray-500">
                            {event.username}
                          </p>
                          {event.message}
                        </div>
                      </div>
                    );
                  }
                }
                if (event.type === "user_joined") {
                  return (
                    <div
                      key={event.id}
                      className="text-center text-xs text-gray-400"
                    >
                      {event.username} has joined the chat
                    </div>
                  );
                }
                if (event.type === "user_left") {
                  return (
                    <div
                      key={event.id}
                      className="text-center text-xs text-gray-400"
                    >
                      {event.username} has left the chat
                    </div>
                  );
                }
                if (event.type === "welcome") {
                  return (
                    <div
                      key={event.id}
                      className="text-center text-xs text-gray-400"
                    >
                      {event.message}
                    </div>
                  );
                }
                if (event.type === "error") {
                  return (
                    <div
                      key={event.id}
                      className="text-center text-xs text-red-500"
                    >
                      {event.message}
                    </div>
                  );
                }
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form className="flex gap-2 p-4" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-gray-700 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-1 focus:ring-gray-700"
            />
            <button
              type="submit"
              disabled={message.trim() === ""}
              className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
