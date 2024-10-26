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
  ADD_SHIPS = 'add_ships',
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
  id: IdType;
  name: string;
  index: IdType;
}

export interface IRoom {
  roomId: IdType;
  roomUsers: IUser[];
}

export interface IShip {
  position: {
    x: number,
    y: number,
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface IField {
  ships: IShip[];
}

export interface IGame {
  idGame: IdType;
  shipsSet?: boolean;
  // players: {
  //     [key: IdType]: IField;
  // };
  players: [
    {
      playerId: IdType;
      ships: IShip[];
    },
    {
      playerId: IdType;
      ships: IShip[];
    },
  ]
}

