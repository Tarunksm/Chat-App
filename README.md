### README

# WebSocket Chat App

A real-time chat application built with **WebSockets and Next.js**.

The project demonstrates how a persistent WebSocket connection can be used to exchange messages between clients in real time.

## Features

- Real-time messaging
- WebSocket server
- Next.js frontend
- Multiple connected clients
- User join notifications
- User leave notifications
- Connection status handling
- Server welcome messages
- Error handling
- TypeScript
- Separate frontend and WebSocket server

## Tech Stack

- Next.js
- React
- TypeScript
- Node.js
- WebSocket (`ws`)

## Architecture

The application consists of two separate parts:

```text
Next.js Frontend
       │
       │ WebSocket Connection
       ▼
WebSocket Server
       │
       ▼
Connected Clients
```

The Next.js application acts as the client, while the Node.js WebSocket server manages connections and broadcasts events between connected users.

## How It Works

When a user opens the application:

1. The frontend establishes a WebSocket connection with the server.
2. The server assigns the connection to a username.
3. The server sends a welcome event.
4. When a user joins, other connected clients receive a `user_joined` event.
5. Messages are sent through the persistent WebSocket connection.
6. The server broadcasts messages to connected clients.
7. When a user disconnects, other clients receive a `user_left` event.

## WebSocket Events

The application uses typed client and server events.

### Client Events

```text
join
chat
```

### Server Events

```text
welcome
join
chat
user_joined
user_left
error
```

This keeps communication between the frontend and WebSocket server structured and predictable.

## Connection Management

The WebSocket server maintains connected clients using a `Map`.

```text
WebSocket Connection → Username
```

This allows the server to identify connected users and broadcast events to the appropriate clients.

## Project Structure

```text
project/
├── client/
│   ├── app/
│   ├── components/
│   └── types/
│
└── server/
    ├── src/
    └── ...
```

The frontend and WebSocket server are kept separate so that each part has a clear responsibility.

## Running Locally

### WebSocket Server

Install dependencies:

```bash
npm install
```

Start the WebSocket server:

```bash
npm run dev
```

The WebSocket server runs on:

```text
ws://localhost:8080
```

### Next.js Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend connects to the WebSocket server using a WebSocket URL.

## Important Note

This project is currently **not deployed as a live application**.

It was built to understand real-time communication using WebSockets and to practice managing persistent client-server connections.

## What I Learned

This project helped me understand:

- How WebSockets differ from normal HTTP requests
- Persistent client-server connections
- Real-time communication
- Broadcasting messages between clients
- Managing connected clients with `Map`
- WebSocket event design
- Client/server event typing with TypeScript
- Connection and disconnection handling
- Separating a WebSocket server from a Next.js frontend

## Author

**Tarun**

GitHub: https://github.com/Tarunksm

LinkedIn: https://www.linkedin.com/in/tarunksm07
