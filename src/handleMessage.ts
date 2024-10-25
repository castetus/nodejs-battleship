import { CustomWebSocket, IMessage, MessageType } from "./types.js";
import Db from './Db.js';
import { addNewUser } from "./controllers.js";

export const handleMessage = (client: CustomWebSocket, message: IMessage) => {
  const { type, data } = message;
  let payload;
  try {
    payload = JSON.parse(data) ?? '';
  } catch (error) {
    console.log(error);
  }
  

  switch (type) {
    case MessageType.REG:
      return addNewUser(payload);
    case MessageType.CREATE_ROOM:
      return '';
  }
};