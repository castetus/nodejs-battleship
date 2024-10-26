import { CustomWebSocket, IdType, IMessage, MessageType } from "./types.js";
import {
  addNewUser,
  createNewRoom,
  updateRooms,
  addUserToRoom,
} from "./controllers.js";
import { sendMessageToAll, sendMessageToClient } from "./index.js";

export const handleMessage = (clientId: IdType, message: IMessage) => {
  const { type, data } = message;
  let payload;
  try {
    payload = JSON.parse(data) ?? '';
  } catch (error) {
    console.log(error);
  }

  switch (type) {
    case MessageType.REG:
      sendMessageToClient(clientId, addNewUser(payload));
      break;
    case MessageType.CREATE_ROOM:
      createNewRoom(clientId);
      sendMessageToAll(updateRooms());
      break;
    case MessageType.ADD_USER_TO_ROOM:
      const { indexRoom } = payload;
      addUserToRoom(clientId, indexRoom);
      sendMessageToAll(updateRooms());
      break;
  }
};