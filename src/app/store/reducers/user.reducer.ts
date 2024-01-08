import { Action, createReducer, on } from '@ngrx/store';

import { UserStateInterface } from 'src/app/models/types/states/userState.interface';
import {
  deleteAccountSuccessAction,
  logoutSuccessAction,
} from 'src/app/store/actions/auth.action';
import {
  getUsersAction,
  getUsersSuccessAction,
  getUsersFailureAction,
  getUsersWithOffsetAction,
  getUsersWithOffsetSuccessAction,
  getUsersWithOffsetFailureAction,
} from 'src/app/store/actions/users.action';
import {
  blockUserAction,
  blockUserFailureAction,
  blockUserInitialStateAction,
  blockUserSuccessAction,
  getUserByIdAction,
  getUserByIdFailureAction,
  getUserByIdSuccessAction,
} from 'src/app/store/actions/user.action';

const initialState: UserStateInterface = {
  isLoading: false,
  total: null,
  users: null,
  user: null,
  success: false,
  error: null,
};

const userReducer = createReducer(
  initialState,
  on(
    getUsersAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getUsersSuccessAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      users: action.payload?.documents,
    })
  ),
  on(
    getUsersFailureAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(
    getUsersWithOffsetAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getUsersWithOffsetSuccessAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      users: [...state.users, ...action.payload?.documents],
    })
  ),
  on(
    getUsersWithOffsetFailureAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  // Get User By Id Reducers
  on(
    getUserByIdAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getUserByIdSuccessAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      user: action.payload,
    })
  ),
  on(
    getUserByIdFailureAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  // Set initialState after Logout/Delete Success Action
  on(
    logoutSuccessAction,
    deleteAccountSuccessAction,
    (): UserStateInterface => ({
      ...initialState,
    })
  ),

  // Block User Reducers
  on(
    blockUserAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    blockUserSuccessAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      user: action.payload,
      success: true,
    })
  ),
  on(
    blockUserFailureAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(
    blockUserInitialStateAction,
    (state): UserStateInterface => ({
      ...state,
      success: false,
    })
  )
);

export function userReducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
