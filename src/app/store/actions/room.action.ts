import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/models/User';
import { ActionTypes } from 'src/app/store/actions/types/room.actiontypes';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { RoomExtendedInterface } from 'src/app/models/types/roomExtended.interface';

// Get Room By Id Actions
export const getRoomByIdAction = createAction(
  ActionTypes.GET_ROOM_BY_ID,
  props<{ currentUserId: string; roomId: string }>()
);

export const getRoomByIdSuccessAction = createAction(
  ActionTypes.GET_ROOM_BY_ID_SUCCESS,
  props<{ payload: RoomExtendedInterface }>()
);

export const getRoomByIdFailureAction = createAction(
  ActionTypes.GET_ROOM_BY_ID_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Get Room Actions
export const getRoomAction = createAction(
  ActionTypes.GET_ROOM,
  // TODO: Create interface for this request
  props<{ currentUserId: string; userId: string }>()
);

export const getRoomSuccessAction = createAction(
  ActionTypes.GET_ROOM_SUCCESS,
  props<{ payload: RoomExtendedInterface }>()
);

export const getRoomFailureAction = createAction(
  ActionTypes.GET_ROOM_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Create Room Actions
export const createRoomAction = createAction(
  ActionTypes.CREATE_ROOM,
  // TODO: Create interface for this request
  props<{ currentUserId: string; userId: string }>()
);

export const createRoomSuccessAction = createAction(
  ActionTypes.CREATE_ROOM_SUCCESS,
  props<{ payload: RoomExtendedInterface }>()
);

export const createRoomFailureAction = createAction(
  ActionTypes.CREATE_ROOM_FAILURE,
  props<{ error: ErrorInterface }>()
);

export const createRoomInitialStateAction = createAction(
  ActionTypes.CREATE_ROOM_INITIAL_STATE
);

// Archive Room Actions
export const archiveRoomAction = createAction(
  ActionTypes.ARCHIVE_ROOM,
  props<{ request: { roomId: string } }>()
);

export const archiveRoomSuccessAction = createAction(
  ActionTypes.ARCHIVE_ROOM_SUCCESS,
  props<{ payload: User }>()
);

export const archiveRoomFailureAction = createAction(
  ActionTypes.ARCHIVE_ROOM_FAILURE,
  props<{ error: ErrorInterface }>()
);

export const archiveRoomInitialStateAction = createAction(
  ActionTypes.ARCHIVE_ROOM_INITIAL_STATE
);
