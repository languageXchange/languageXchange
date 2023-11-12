import { Room } from 'src/app/models/Room';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';

export interface RoomStateInterface {
  isLoading: boolean;
  total: number;
  rooms: Room[] | null;
  error: ErrorInterface | null;
}