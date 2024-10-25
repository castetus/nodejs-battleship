import Db from "./Db.js";
import { IUser, MessageType } from "./types.js";

export const addNewUser = (user: IUser) => {
  Db.registerUser(user);
  const { name, index } = user;
  return {
    type: MessageType.REG,
    data: JSON.stringify({
      name,
      index,
    })
  }
};

export const createNewGame = () => {
  return '';
};

