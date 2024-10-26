import { IdType, IRoom, IUser } from "./types.js";

class Db {
  private users = new Map<IdType, IUser>;
  private rooms = new Map<IdType, IRoom>;

  getUsers() {
    return Array.from(this.users.values());
  }

  getUserById(id: IdType) {
    return this.users.get(id);
  }

  registerUser(user: IUser) {
    this.users.set(user.index, user);
  }

  addRoom(room: IRoom) {
    this.rooms.set(room.roomId, room);
  }

  getRooms() {
    return Array.from(this.rooms.values());
  }

  addUserToRoom(user: IUser, roomId: IdType) {
    const existedUsers = this.rooms.get(roomId)?.roomUsers ?? [];
    this.rooms.set(roomId, {
      roomId,
      roomUsers: [
        ...existedUsers,
        user,
      ],
    });
  };

  // updateRoom(user) {

  // }
}

export default new Db();