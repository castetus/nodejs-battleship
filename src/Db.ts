import { IdType, IGame, IRoom, IShip, IUser } from "./types.js";

class Db {
  private users = new Map<IdType, IUser>;
  private rooms = new Map<IdType, IRoom>;
  private games = new Map<IdType, IGame>;
  private currentPlayer: IdType | undefined;

  getUsers() {
    return Array.from(this.users.values());
  }

  getUserById(id: IdType) {
    console.log(this.users, id)
    return this.users.get(id);
  }

  registerUser(user: IUser) {
    this.users.set(user.id, user);
  }

  addRoom(room: IRoom) {
    this.rooms.set(room.roomId, room);
  }

  getRooms(): IRoom[] {
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

  createGame(game: IGame) {
    this.games.set(game.idGame, game);
  };

  addShips(gameId: IdType, playerId: IdType, ships: IShip[]) {
    const game = this.games.get(gameId);
    if (game) {
      this.games.set(gameId, {
        ...game,
        shipsSet: true,
      });
    }
  };

  getGameById(gameId: IdType) {
    return this.games.get(gameId);
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(currentPlayer: IdType) {
    this.currentPlayer = currentPlayer;
  }
}

export default new Db();