import { CustomWebSocket, IdType, IMessage, MessageType } from "./types.js";
import {
  addNewUser,
  createNewRoom,
  updateRooms,
  addUserToRoom,
  createNewGame,
} from "./controllers.js";
import { sendMessageToAll, sendMessageToClient } from "./index.js";

export const handleMessage = (clientId: IdType, message: IMessage) => {
  const { type, data } = message;
  let payload;
  try {
    if (data.length) {
      payload = JSON.parse(data) ?? '';
    }
  } catch (error) {
    console.log(error);
  }

  switch (type) {
    case MessageType.REG:
      sendMessageToClient(clientId, addNewUser(clientId, payload));
      break;
    case MessageType.CREATE_ROOM:
      createNewRoom(clientId);
      sendMessageToAll(updateRooms());
      break;
    case MessageType.ADD_USER_TO_ROOM:
      const { indexRoom } = payload;
      const newGamePlayers = addUserToRoom(clientId, indexRoom);
      sendMessageToAll(updateRooms());
      if (newGamePlayers) {
        for (const player of newGamePlayers) {
          sendMessageToClient(player.idPlayer, {
            type: MessageType.CREATE_GAME,
            data: JSON.stringify(player),
          });
        }
      }
      break;
    // case 
  }
};