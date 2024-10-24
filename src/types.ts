export enum MessageType {
  REG = 'reg'
}

export interface IMessage {
  type: MessageType;
  data: string;
  id: number;
}