import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { lastSeen } from 'src/app/extras/utils';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { currentUserSelector } from 'src/app/store/selectors/auth.selector';
import { activateRoomAction } from 'src/app/store/actions/message.action';
import {
  getRoomsAction,
  getRoomsWithOffsetAction,
} from 'src/app/store/actions/rooms.action';
import {
  isLoadingSelector,
  roomsSelector,
  totalSelector,
  errorSelector,
} from 'src/app/store/selectors/room.selector';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  subscription: Subscription;
  currentUser$: Observable<User | null>;
  isLoading$: Observable<boolean>;
  rooms$: Observable<Room[] | null>;
  total$: Observable<number | null> = null;

  currentUserId: string = null;

  model = {
    icon: 'chatbubbles-outline',
    title: 'No Chat Rooms',
    color: 'warning',
  };

  constructor(
    private store: Store,
    private router: Router,
    private fcmService: FcmService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.initValues();
    // Trigger FCM
    this.fcmService.registerPush();
    // Get all chat Rooms
    this.listRooms();
    //await this.listRooms();
  }

  ionViewWillEnter() {
    this.subscription = new Subscription();

    // Present Toast if error
    this.subscription.add(
      this.store
        .pipe(select(errorSelector))
        .subscribe((error: ErrorInterface) => {
          if (error) {
            this.presentToast(error.message, 'danger');
          }
        })
    );
  }

  ionViewWillLeave() {
    // Unsubscribe from all subscriptions
    this.subscription.unsubscribe();
  }

  initValues() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.rooms$ = this.store.pipe(select(roomsSelector));
    this.total$ = this.store.pipe(select(totalSelector));

    // Set Current User Id
    this.currentUser$
      .subscribe((user) => {
        if (user) {
          this.currentUserId = user.$id;
        }
      })
      .unsubscribe();
  }

  listRooms() {
    this.store.dispatch(getRoomsAction());
  }

  //
  // Infinite Scroll
  //

  loadMore(event) {
    // Offset is the number of users already loaded
    let offset: number = 0;

    this.rooms$
      .subscribe((users) => {
        if (!users) return;
        offset = users.length;
        this.total$
          .subscribe((total) => {
            if (offset < total) {
              this.store.dispatch(
                getRoomsWithOffsetAction({
                  request: { offset },
                })
              );
            } else {
              console.log('All rooms loaded');
            }
          })
          .unsubscribe();
      })
      .unsubscribe();

    event.target.complete();
  }

  getChat(room) {
    this.store.dispatch(activateRoomAction({ payload: room }));
  }

  handleRefresh(event) {
    this.listRooms();
    event.target.complete();
    console.log('Async operation refresh has ended');
  }

  getBadge(room): number {
    return room.messages.filter(
      (message) => message.seen === false && message.to === this.currentUserId
    ).length;
  }

  openArchiveChatPage() {
    this.router.navigate(['home/messages/archive']);
  }

  archiveRoom(room: Room) {
    console.log('archiveRoom clicked', room);
  }

  //
  // Utils
  //

  getLastMessage(room) {
    let lastMessage = {
      body: null,
      time: null,
    };

    const type = room.messages[room.messages.length - 1]?.type || null;
    lastMessage.time =
      room.messages[room.messages.length - 1]?.$updatedAt || null;

    switch (type) {
      case 'body':
        lastMessage.body = room.messages[room.messages.length - 1].body;
        break;
      case 'image':
        lastMessage.body = '📷 Image';
        break;
      case 'audio':
        lastMessage.body = '🎵 Audio';
        break;
      // case 'video':
      //   lastMessage.body = '🎥 Video';
      //   break;
      // case 'file':
      //   lastMessage.body = '📁 File';
      //   break;
      default:
        lastMessage.body = 'Say Hi! 👋';
        break;
    }

    return lastMessage;
  }

  messageTime(d: any) {
    if (!d) return null;
    let time = lastSeen(d);
    if (time === 'online') time = 'now';
    return time;
  }

  lastSeen(d: any) {
    if (!d) return null;
    return lastSeen(d);
  }

  //
  // Present Toast
  //

  async presentToast(msg: string, color?: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color || 'primary',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
