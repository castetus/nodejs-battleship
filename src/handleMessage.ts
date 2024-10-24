import { IMessage, MessageType } from "./types.js";

export const handleMessage = (message: IMessage) => {
  const { type, data, id } = message;
  const payload = JSON.parse(data);

  switch (type) {
    case MessageType.REG:

  }
};