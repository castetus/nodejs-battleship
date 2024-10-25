import Db from "./Db.js";
import { IdType, IUser } from "./types.js";

export const checkUser = (id: IdType): IUser | undefined => {
  const users = Db.getUsers();
  return users.find((user) => user.index === id);
};