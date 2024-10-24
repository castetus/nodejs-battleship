import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { handleMessage } from './handleMessage.js';
import { IMessage } from './types.js';

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new WebSocketServer({ port });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Received:', message.toString());
    const response = handleMessage(message.toString() as unknown as IMessage);
    console.log(response)
    socket.send(JSON.stringify(response));
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);