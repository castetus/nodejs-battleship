import { WebSocket } from 'ws';

export interface CustomWebSocket extends WebSocket {
  id: string;
}

export type IdType = string | number;

export enum MessageType {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
  CREATE_GAME = 'create_game',
}

export interface IMessage {
  type: MessageType;
  data: string;
  id: 0;
}

export interface IUser {
  name: string;
  index: IdType;
}

export interface IRoom {
  roomId: IdType;
  roomUsers: IUser[];
}