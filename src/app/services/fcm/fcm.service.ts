import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
  RegistrationError,
} from '@capacitor/push-notifications';

import { ApiService } from '../api/api.service';
import { currentUserSelector } from 'src/app/store/selectors/auth.selector';
import { updateCurrentUserAction } from 'src/app/store/actions/user.action';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    private store: Store,
    private router: Router,
    private api: ApiService
  ) {}

  async registerPush() {
    // TODO: #226 Web notification can also be implemented here
    if (Capacitor.getPlatform() === 'web') {
      return;
    }

    // Check permission
    let permStatus = await PushNotifications.checkPermissions();

    if (
      permStatus.receive === 'prompt' ||
      permStatus.receive === 'prompt-with-rationale'
    ) {
      // Request permission
      permStatus = await PushNotifications.requestPermissions();
    }

    // Error if permission not granted
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    // Register with Apple / Google to receive push via APNS/FCM
    await PushNotifications.register();

    // Listeners for registration, errors, and incoming notifications
    PushNotifications.addListener('registration', (token: Token) => {
      // TODO: It may handle in api.service.ts
      console.log('My token: ' + JSON.stringify(token));
      if (Capacitor.getPlatform() === 'ios') {
        this.handleTokenForIOS(token);
      } else if (Capacitor.getPlatform() === 'android') {
        this.handleTokenForAndroid(token);
      }
    });
  }

  listenerPush() {
    // TODO: #226 Web notification can also be implemented here
    if (Capacitor.getPlatform() === 'web') {
      return;
    }

    console.log('Listener FCM started');

    PushNotifications.addListener(
      'registrationError',
      (error: RegistrationError) => {
        console.log('Error: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        console.log(
          'Action performed: ' + JSON.stringify(notification.notification)
        );
        const data = notification.notification.data;
        if (data.roomId) {
          // Redirect to chat page
          this.router.navigate(['/', 'home', 'chat', data.roomId]);
        }
      }
    );
  }

  // Example method for managing push notifications
  async getDeliveredNotifications() {
    const notificationList =
      await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  handleTokenForIOS(token: Token) {
    this.api.account.getPrefs().then((prefs) => {
      if (prefs['ios'] !== token.value) {
        prefs['ios'] = token.value;
        this.api.account
          .updatePrefs(prefs)
          .then((res) => {
            console.log('ios token updated', res);
          })
          .catch((err) => {
            console.log('ios token update error', err);
          });

        // Add "push" to currentUser.notifications
        this.updateCurrentUser();
      }
    });
  }

  handleTokenForAndroid(token: Token) {
    this.api.account.getPrefs().then((prefs) => {
      if (prefs['android'] !== token.value) {
        prefs['android'] = token.value;
        this.api.account
          .updatePrefs(prefs)
          .then((res) => {
            console.log('android token updated', res);
          })
          .catch((err) => {
            console.log('android token update error', err);
          });

        // Add "push" to currentUser.notifications
        this.updateCurrentUser();
      }
    });
  }

  // Update currentUser
  updateCurrentUser() {
    this.store
      .pipe(select(currentUserSelector))
      .subscribe((currentUser) => {
        if (currentUser) {
          let notifications = [...(currentUser?.notifications || [])];
          console.log('notifications :', notifications);

          if (!notifications.includes('push')) {
            notifications.push('push');
          }

          // Dispatch updateCurrentUserAction
          const request = {
            userId: currentUser?.$id,
            data: { notifications },
          };

          this.store.dispatch(updateCurrentUserAction({ request }));
        }
      })
      .unsubscribe();
  }
}
