import Db from "./Db.js";
import { IdType, IGame, IMessage, IMessageWOId, IRoom, IUser, MessageType } from "./types.js";
import { v4 as uuidv4 } from 'uuid';

export const addNewUser = (userId: IdType, user: IUser): IMessageWOId => {
  Db.registerUser({
    ...user,
    id: userId,
  });
  const { name, index } = user;
  return {
    type: MessageType.REG,
    data: JSON.stringify({
      name,
      index,
    })
  };
};

export const createNewRoom = (id: IdType)=> {
  const user = Db.getUserById(id);

  if (!user) {
    return;
  }
  const newRoom: IRoom = {
    roomUsers: [user],
    roomId: uuidv4(),
  };

  Db.addRoom(newRoom);

  return {
    type: MessageType.CREATE_ROOM,
    data: '',
  };
};

export const addUserToRoom = (userId: IdType, roomId: IdType) => {
  const user = Db.getUserById(userId);
  const existedRoom = Db.getRooms().find((room) => room.roomId === roomId);
  if (!existedRoom) {
    createNewRoom(userId);
  }
  if (user) {
    Db.addUserToRoom(user, roomId);
  }
  const game = createNewGame(roomId);
  if (game) {
    const players = Object.keys(game.players);
    return players.map((player) => ({
      idPlayer: player,
      idGame: game.idGame,
    }));
  }
};

export const updateRooms = (): IMessageWOId => {
  const rooms = Db.getRooms();

  const availableRooms = rooms.filter((room) => room.roomUsers.length === 1);
  return {
    type: MessageType.UPDATE_ROOM,
    data: JSON.stringify(availableRooms),
  };
};

export const createNewGame = (roomId: IdType) => {
  const room = Db.getRooms().find((room) => room.roomId === roomId);
  const roomUsers = room?.roomUsers;
  if (!roomUsers || roomUsers.length !== 2) {
    return;
  }
  const newGame: IGame = {
    idGame: uuidv4(),
    players: {
      [roomUsers[0].id]: {
        ships: [],
      },
      [roomUsers[1].id]: {
        ships: [],
      }
    }
  }

  Db.createGame(newGame);

  return newGame;
};

