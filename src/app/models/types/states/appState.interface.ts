// TODO: Not used yet, but will be used in the future
import { AuthStateInterface } from './authState.interface';
import { LocaleStateInterface } from './localeState.interface';
import { MessageStateInterface } from './messageState.interface';
import { RoomStateInterface } from './roomState.interface';
import { UserStateInterface } from './userState.interface';
import { VisitsStateInterface } from './visitsState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  user: UserStateInterface;
  room: RoomStateInterface;
  message: MessageStateInterface;
  locale: LocaleStateInterface;
  visits: VisitsStateInterface;
}
