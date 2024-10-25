import { WebSocket, WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { handleMessage } from './handleMessage.js';
import { CustomWebSocket, IdType, IMessage, MessageType } from './types.js';
import { v4 as uuidv4 } from 'uuid';
import { checkUser } from './helpers.js';

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new WebSocketServer({ port });

const clients = new Map<IdType, CustomWebSocket>();

server.on('connection', (ws: WebSocket) => {
  const client = ws as CustomWebSocket;
  client.id = uuidv4();
  clients.set(client.id, client);

  client.on('message', (message) => {
    console.log(`Received message: ${message} from client ${client.id}`);
    
    handleMessage(client, JSON.parse(message.toString()) as unknown as IMessage);
  });

  client.on('close', () => {
    console.log(`Client ${client.id} disconnected`);
    clients.delete(client.id);
  });
});

export const sendMessageToClient = (clientId: IdType, message: string) => {
  const client = clients.get(clientId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  } else {
    console.log(`Client ${clientId} not found or not open`);
  }
};

export const sendMessageToAll = (message: MessageType) => {
  for (const client of clients.values()) {
    sendMessageToClient(client.id, message);
  }
};

// process.on('exit', server.close);

console.log(`WebSocket server is running on ws://localhost:${port}`);