import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/store/actions/room.actiontypes';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { getRoomsResponseInterface } from 'src/app/models/types/responses/getRoomsResponse.interface';

// Get Rooms Actions
export const getRoomsAction = createAction(
  ActionTypes.GETROOMS,
  props<{ currentUserId: string }>()
);

export const getRoomsSuccessAction = createAction(
  ActionTypes.GETROOMS_SUCCESS,
  props<{ payload: getRoomsResponseInterface }>()
);

export const getRoomsFailureAction = createAction(
  ActionTypes.GETROOMS_FAILURE,
  props<{ error: ErrorInterface }>()
);