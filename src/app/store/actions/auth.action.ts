import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/store/actions/types/auth.actiontypes';
import { Account } from 'src/app/models/Account';
import { User } from 'src/app/models/User';
import { Language } from 'src/app/models/Language';
import { LoginRequestInterface } from 'src/app/models/types/requests/loginRequest.interface';
import { RegisterRequestInterface } from 'src/app/models/types/requests/registerRequest.interface';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { CompleteRegistrationRequestInterface } from 'src/app/models/types/requests/completeRegistrationRequest.interface';
import { createLanguageRequestInterface } from 'src/app/models/types/requests/createLanguageRequest.interface';
import { isLoggedInResponseInterface } from 'src/app/models/types/responses/isLoggedInResponse.interface';
import { listIdentitiesResponseInterface } from 'src/app/models/types/responses/listIdentitiesResponse.interface';
import { listSessionsResponseInterface } from 'src/app/models/types/responses/listSessionsResponse.interface';
import { verifyEmailConfirmationRequestInterface } from 'src/app/models/types/requests/verifyEmailConfirmationRequest.interface';

// Login
export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ payload: Account }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Register
export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ payload: Account }>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Complete Registration
export const completeRegistrationAction = createAction(
  ActionTypes.COMPLETE_REGISTRATION,
  props<{ request: CompleteRegistrationRequestInterface; id: string }>()
);

export const completeRegistrationSuccessAction = createAction(
  ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
  props<{ payload: User }>()
);

export const completeRegistrationFailureAction = createAction(
  ActionTypes.COMPLETE_REGISTRATION_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Language Selection
export const languageSelectionAction = createAction(
  ActionTypes.LANGUAGE_SELECTION,
  props<{ request: createLanguageRequestInterface[] }>()
);

export const languageSelectionSuccessAction = createAction(
  ActionTypes.LANGUAGE_SELECTION_SUCCESS,
  props<{ payload: Language[] }>()
);

export const languageSelectionFailureAction = createAction(
  ActionTypes.LANGUAGE_SELECTION_FAILURE,
  props<{ error: ErrorInterface }>()
);

export const updateLanguageArrayAction = createAction(
  ActionTypes.UPDATE_LANGUAGE_ARRAY,
  // TODO: Create interface for this request
  props<{ request: string[]; id: string }>()
);

export const updateLanguageArraySuccessAction = createAction(
  ActionTypes.UPDATE_LANGUAGE_ARRAY_SUCCESS,
  props<{ payload: User }>()
);

export const updateLanguageArrayFailureAction = createAction(
  ActionTypes.UPDATE_LANGUAGE_ARRAY_FAILURE,
  props<{ error: ErrorInterface }>()
);

// isLoggedIn
export const isLoggedInAction = createAction(ActionTypes.ISLOGGEDIN);

export const isLoggedInSuccessAction = createAction(
  ActionTypes.ISLOGGEDIN_SUCCESS,
  props<{ payload: isLoggedInResponseInterface }>()
);

export const isLoggedInSuccessCompleteRegistrationAction = createAction(
  ActionTypes.ISLOGGEDIN_SUCCESS_COMPLETE_REGISTRATION,
  props<{ payload: isLoggedInResponseInterface; error: ErrorInterface }>()
);

export const isLoggedInFailureAction = createAction(
  ActionTypes.ISLOGGEDIN_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Verify Email
export const verifyEmailAction = createAction(ActionTypes.VERIFY_EMAIL);

export const verifyEmailSuccessAction = createAction(
  ActionTypes.VERIFY_EMAIL_SUCCESS
);

export const verifyEmailFailureAction = createAction(
  ActionTypes.VERIFY_EMAIL_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Verify Email Confirmation
export const verifyEmailConfirmationAction = createAction(
  ActionTypes.VERIFY_EMAIL_CONFIRMATION,
  props<{ request: verifyEmailConfirmationRequestInterface }>()
);

export const verifyEmailConfirmationSuccessAction = createAction(
  ActionTypes.VERIFY_EMAIL_CONFIRMATION_SUCCESS
);

export const verifyEmailConfirmationFailureAction = createAction(
  ActionTypes.VERIFY_EMAIL_CONFIRMATION_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Reset Password
export const resetPasswordAction = createAction(
  ActionTypes.RESET_PASSWORD,
  props<{ request: { email: string } }>()
);

export const resetPasswordSuccessAction = createAction(
  ActionTypes.RESET_PASSWORD_SUCCESS
);

export const resetPasswordFailureAction = createAction(
  ActionTypes.RESET_PASSWORD_FAILURE,
  props<{ error: ErrorInterface }>()
);

// TODO: Reset Password Confirmation

// List Identities
export const listIdentitiesAction = createAction(ActionTypes.LIST_IDENTITIES);

export const listIdentitiesSuccessAction = createAction(
  ActionTypes.LIST_IDENTITIES_SUCCESS,
  props<{ payload: listIdentitiesResponseInterface }>()
);

export const listIdentitiesFailureAction = createAction(
  ActionTypes.LIST_IDENTITIES_FAILURE,
  props<{ error: ErrorInterface }>()
);

// List Sessions
export const listSessionsAction = createAction(ActionTypes.LIST_SESSIONS);

export const listSessionsSuccessAction = createAction(
  ActionTypes.LIST_SESSIONS_SUCCESS,
  props<{ payload: listSessionsResponseInterface }>()
);

export const listSessionsFailureAction = createAction(
  ActionTypes.LIST_SESSIONS_FAILURE,
  props<{ error: ErrorInterface }>()
);

// Logout
export const logoutAction = createAction(ActionTypes.LOGOUT);

export const logoutSuccessAction = createAction(
  ActionTypes.LOGOUT_SUCCESS,
  props<{ payload: null }>()
);

export const logoutFailureAction = createAction(
  ActionTypes.LOGOUT_FAILURE,
  props<{ error: ErrorInterface }>()
);
