import { IdType, IRoom, IUser } from "./types.js";

class Db {
  private users: IUser[] = [];
  private rooms: IRoom[] = [];

  getUsers() {
    return this.users;
  }

  getUserById(id: IdType) {
    return this.users.find((user) => user.index === id);
  }

  registerUser(user: IUser) {
    this.users.push(user);
  }

  addRoom(room: IRoom) {
    this.rooms.push(room);
  }

  getRooms() {
    return this.rooms;
  }

  updateRooms() {

  }
}

export default new Db();