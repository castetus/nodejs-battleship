import Db from "./Db.js";
import { IdType, IMessage, IMessageWOId, IRoom, IUser, MessageType } from "./types.js";
import { v4 as uuidv4 } from 'uuid';

export const addNewUser = (user: IUser): IMessageWOId => {
  Db.registerUser(user);
  const { name, index } = user;
  return {
    type: MessageType.REG,
    data: JSON.stringify({
      name,
      index,
    })
  };
};

export const addUserToRoom = (userId: IdType, roomId: IdType) => {
  const user = Db.getUserById(userId);
  if (user) {
    Db.addUserToRoom(user, roomId);
  }
  updateRooms();
}

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

export const updateRooms = (): IMessageWOId => {
  const rooms = Db.getRooms();
  const availableRooms = rooms.filter((room) => room.roomUsers.length === 1);
  return {
    type: MessageType.UPDATE_ROOM,
    data: JSON.stringify(availableRooms),
  };
};

export const createGame = () => {

};

