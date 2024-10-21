import { WebSocketServer } from 'ws'

const port = Number(process.env.PORT) || 8080;
const server = new WebSocketServer({ port });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Received:', message);
    // Echo the message back to the client
    socket.send(`Server: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);