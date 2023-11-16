import { Message } from 'src/app/models/Message';
import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';

export interface RoomExtendedInterface extends Room {
  messages: Message[];
  lastMessage: Message;
  userData: User;
}
