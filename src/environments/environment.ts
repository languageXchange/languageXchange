export const HOMEPAGE_URL = 'https://app.languagexchange.net/';
export const API_URL = 'https://api.languagexchange.net/';
export const DB_URL = 'https://db.languagexchange.net/';

export const environment = {
  production: false,
  bundleId: 'tech.newchapter.languagexchange',
  appwrite: {
    APP_ENDPOINT: `${DB_URL}v1`,
    APP_PROJECT: '650750d21e4a6a589be3',
    APP_DATABASE: '650750f16cd0c482bb83',
    USERS_COLLECTION: '65103e2d3a6b4d9494c8',
    ROOMS_COLLECTION: '6507510fc71f989d5d1c',
    MESSAGES_COLLECTION: '65075108a4025a4f5bd7',
    LANGUAGES_COLLECTION: '6511599e2bf0bb1b4d2c',
    USER_BUCKET: '6515f94d20becd47cb40',
    MESSAGE_BUCKET: '655fedc46d24b615878a',
    AUDIO_BUCKET: '6563aa2ef2cd2964cf27',
  },
  url: {
    HOMEPAGE_URL: HOMEPAGE_URL,
    RESET_PASSWORD_URL: `${HOMEPAGE_URL}login/reset-password/new`,
    SIGNUP_COMPLETE_URL: `${HOMEPAGE_URL}login/signup/complete`,
    SUCCESS_OAUTH2: `${HOMEPAGE_URL}auth/oauth2/success`,
    FAILURE_OAUTH2: `${HOMEPAGE_URL}auth/oauth2/failure`,
    VERIFY_EMAIL: `${HOMEPAGE_URL}auth/verify-email`,
    CREATE_ROOM_API_URL: `${API_URL}api/room`,
    CREATE_MESSAGE_API_URL: `${API_URL}api/message`,
  },
  opts: {
    PAGINATION_LIMIT: 10,
  },
  oauth: {
    google: {
      appID:
        '108932543808-gm27rt47oc22bd190ogrh7j5cmosv5su.apps.googleusercontent.com',
      base: 'https://accounts.google.com/o/oauth2/v2/auth',
      uri: 'https://db.languagexchange.net/v1/account/sessions/oauth2/callback/google/650750d21e4a6a589be3',
    },
    facebook: {
      appID: '756286679647299',
      base: 'https://www.facebook.com/v2.8/dialog/oauth',
      uri: 'https://db.languagexchange.net/v1/account/sessions/oauth2/callback/facebook/650750d21e4a6a589be3',
    },
    apple: {
      appID: 'service.tech.newchapter.languageXchange',
      base: 'https://appleid.apple.com/auth/authorize',
      uri: 'https://db.languagexchange.net/v1/account/sessions/oauth2/callback/apple/650750d21e4a6a589be3',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
