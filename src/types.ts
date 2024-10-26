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
  ADD_USER_TO_ROOM = 'add_user_to_room',
  START_GAME = 'start_game',
  TURN = 'turn',
  ATTACK = 'attack',
  FINISH = 'finish',
}

export interface IMessage {
  type: MessageType;
  data: string;
  id: 0;
}

export type IMessageWOId = Omit<IMessage, 'id'>;

export interface IUser {
  name: string;
  index: IdType;
}

export interface IRoom {
  roomId: IdType;
  roomUsers: IUser[];
}

export interface IField {

}