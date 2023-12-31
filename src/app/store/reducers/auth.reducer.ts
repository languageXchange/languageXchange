import { Action, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from 'src/app/models/types/states/authState.interface';
import { totalUnseenMessagesSuccessAction } from 'src/app/store/actions/notification.action';
import {
  completeRegistrationAction,
  completeRegistrationFailureAction,
  completeRegistrationSuccessAction,
  isLoggedInAction,
  isLoggedInFailureAction,
  isLoggedInSuccessAction,
  isLoggedInSuccessCompleteRegistrationAction,
  languageSelectionAction,
  languageSelectionFailureAction,
  languageSelectionSuccessAction,
  listIdentitiesAction,
  listIdentitiesFailureAction,
  listIdentitiesSuccessAction,
  listSessionsAction,
  listSessionsFailureAction,
  listSessionsSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
  logoutFailureAction,
  logoutSuccessAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  updateLanguageArrayAction,
  updateLanguageArrayFailureAction,
  updateLanguageArraySuccessAction,
  verifyEmailAction,
  verifyEmailConfirmationAction,
  verifyEmailFailureAction,
  verifyEmailSuccessAction,
} from 'src/app/store/actions/auth.action';
import {
  updatePresenceFailureAction,
  updatePresenceSuccessAction,
} from 'src/app/store/actions/presence.action';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from 'src/app/store/actions/user.action';
import {
  createLanguageAction,
  createLanguageFailureAction,
  createLanguageSuccessAction,
  deleteLanguageAction,
  deleteLanguageFailureAction,
  deleteLanguageSuccessAction,
  updateLanguageAction,
  updateLanguageFailureAction,
  updateLanguageSuccessAction,
} from 'src/app/store/actions/language.action';
import {
  uploadOtherPhotosAction,
  uploadOtherPhotosFailureAction,
  uploadOtherPhotosSuccessAction,
  uploadProfilePictureAction,
  uploadProfilePictureFailureAction,
  uploadProfilePictureSuccessAction,
} from 'src/app/store/actions/bucket.action';

const initialState: AuthStateInterface = {
  isLoading: false,
  account: null,
  currentUser: null,
  isLoggedIn: null,
  languages: null,
  identities: null,
  sessions: null,
  isLanguageDone: false,
  verifyEmailSuccess: false,
  verifyEmailConfirmationSuccess: false,
  registerValidationError: null,
  loginValidationError: null,
  unauthorizedError: null,
  presenceError: null,
  profileError: null,
  editProfileError: null,
  accountDetailError: null,
  verifyEmailConfirmationError: null,
};

const authReducer = createReducer(
  initialState,

  // Login Actions
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      loginValidationError: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      account: action.payload,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      loginValidationError: action.error,
    })
  ),

  // Register Actions
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      registerValidationError: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      account: action.payload,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      registerValidationError: action.error,
    })
  ),

  // Complete Registration Actions
  on(
    completeRegistrationAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      registerValidationError: null,
    })
  ),
  on(
    completeRegistrationSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.payload,
    })
  ),
  on(
    completeRegistrationFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      registerValidationError: action.error,
    })
  ),
  on(
    languageSelectionAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      registerValidationError: null,
      isLanguageDone: false,
    })
  ),
  on(
    languageSelectionSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      languages: action.payload,
      isLanguageDone: true,
    })
  ),
  on(
    languageSelectionFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      registerValidationError: action.error,
    })
  ),
  on(
    updateLanguageArrayAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      registerValidationError: null,
    })
  ),
  on(
    updateLanguageArraySuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.payload,
    })
  ),
  on(
    updateLanguageArrayFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      registerValidationError: action.error,
    })
  ),

  // isLoggedIn Actions
  on(
    isLoggedInAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      unauthorizedError: null,
    })
  ),
  on(
    isLoggedInSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      account: action.payload?.account,
      // TODO: No need here to fill currentUser
      currentUser: action.payload?.currentUser,
    })
  ),
  on(
    isLoggedInSuccessCompleteRegistrationAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      account: action.payload?.account,
      currentUser: action.payload?.currentUser,
      unauthorizedError: action.error,
    })
  ),
  on(
    isLoggedInFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      unauthorizedError: action.error,
    })
  ),

  // Get User Actions
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.payload,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      profileError: action.error,
    })
  ),

  // Update User Actions
  on(
    updateCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.payload,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      editProfileError: action.error,
    })
  ),

  // Create Language Actions
  on(
    createLanguageAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    createLanguageSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.payload,
    })
  ),
  on(
    createLanguageFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      editProfileError: action.error,
    })
  ),

  // Update Language Actions
  on(
    updateLanguageAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(updateLanguageSuccessAction, (state, action): AuthStateInterface => {
    const updatedLanguages = state.currentUser.languages.map((language) =>
      language.$id === action.payload.$id ? action.payload : language
    );

    return {
      ...state,
      isLoading: false,
      currentUser: {
        ...state.currentUser,
        languages: updatedLanguages,
      },
    };
  }),
  on(
    updateLanguageFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      editProfileError: action.error,
    })
  ),

  // Delete Language Actions
  on(
    deleteLanguageAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    deleteLanguageSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.payload,
    })
  ),
  on(
    deleteLanguageFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      editProfileError: action.error,
    })
  ),

  // Bucket Actions
  on(
    uploadProfilePictureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    uploadProfilePictureSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: {
        ...state.currentUser,
        profilePhoto: action.payload.profilePhoto,
      },
    })
  ),
  on(
    uploadProfilePictureFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      editProfileError: action.error,
    })
  ),

  on(
    uploadOtherPhotosAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    uploadOtherPhotosSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: {
        ...state.currentUser,
        otherPhotos: action.payload.otherPhotos,
      },
    })
  ),
  on(
    uploadOtherPhotosFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      editProfileError: action.error,
    })
  ),

  // Total Unseen Messages Reducer
  on(
    totalUnseenMessagesSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      currentUser: {
        ...state.currentUser,
        totalUnseen: action.payload,
      },
    })
  ),

  // Update Presence Actions
  on(
    updatePresenceSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      currentUser: action.payload,
    })
  ),
  on(
    updatePresenceFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      presenceError: action.error,
    })
  ),

  // Verify Email Actions
  on(
    verifyEmailAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      verifyEmailSuccess: false,
    })
  ),
  on(
    verifyEmailSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      verifyEmailSuccess: true,
    })
  ),
  on(
    verifyEmailFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      accountDetailError: action.error,
    })
  ),

  // Verify Email Confirmation Actions
  on(
    verifyEmailConfirmationAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      verifyEmailConfirmationSuccess: false,
    })
  ),
  on(
    verifyEmailSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      verifyEmailConfirmationSuccess: true,
      currentUser: {
        ...state.currentUser,
        verified: true,
      },
    })
  ),
  on(
    verifyEmailFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      verifyEmailConfirmationError: action.error,
    })
  ),

  // List Identities Actions
  on(
    listIdentitiesAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    listIdentitiesSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      identities: action.payload?.identities,
    })
  ),
  on(
    listIdentitiesFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      accountDetailError: action.error,
    })
  ),

  // List Sessions Actions
  on(
    listSessionsAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    listSessionsSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      sessions: action.payload?.sessions,
    })
  ),
  on(
    listSessionsFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      registerValidationError: action.error,
    })
  ),

  // Logout Actions
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    logoutSuccessAction,
    (): AuthStateInterface => ({
      ...initialState,
    })
  ),
  on(
    logoutFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      unauthorizedError: action.error,
    })
  )
);

export function authReducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
