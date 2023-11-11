import { Action, createReducer, on } from '@ngrx/store';

import { CommunityStateInterface } from 'src/app/models/types/states/communityState.interface';
import {
  getUsersAction,
  getUsersSuccessAction,
  getUsersFailureAction,
} from 'src/app/store/actions/community.action';

const initialState: CommunityStateInterface = {
  isLoading: false,
  total: null,
  users: null,
  error: null,
};

const communityReducer = createReducer(
  initialState,
  // Get Users Reducers
  on(
    getUsersAction,
    (state): CommunityStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getUsersSuccessAction,
    (state, action): CommunityStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      users: action.payload?.documents,
    })
  ),
  on(
    getUsersFailureAction,
    (state, action): CommunityStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  )
);

export function communityReducers(
  state: CommunityStateInterface,
  action: Action
) {
  return communityReducer(state, action);
}