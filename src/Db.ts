import { IRoom, IUser } from "./types.js";

class Db {
  private users: IUser[] = [];
  private rooms: IRoom[] = [];

  getUsers() {
    return this.users;
  }

  registerUser(user: IUser) {
    this.users.push(user);
  }

  updateRooms() {

  }
}

export default new Db();