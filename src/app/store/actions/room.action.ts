import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/store/actions/room.actiontypes';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { RoomWithUserData } from 'src/app/models/Room';

// Get Room By Id Actions
export const getRoomByIdAction = createAction(
  ActionTypes.GET_ROOM_BY_ID,
  props<{ roomId: string }>()
);

export const getRoomByIdSuccessAction = createAction(
  ActionTypes.GET_ROOM_BY_ID_SUCCESS,
  props<{ payload: RoomWithUserData }>()
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
  props<{ payload: RoomWithUserData }>()
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
  props<{ payload: RoomWithUserData }>()
);

export const createRoomFailureAction = createAction(
  ActionTypes.CREATE_ROOM_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Select Room Actions
export const selectRoomAction = createAction(
  ActionTypes.SELECT_ROOM,
  props<{ payload: RoomWithUserData }>()
);
