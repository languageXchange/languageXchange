import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { lastSeen } from 'src/app/extras/utils';
import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoomService } from 'src/app/services/chat/room.service';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { getRoomsAction } from 'src/app/store/actions/room.action';
import { currentUserSelector } from 'src/app/store/selectors/auth.selector';
import { roomsSelector } from 'src/app/store/selectors/room.selector';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  rooms: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isLoading: boolean = false;

  currentUser$: Observable<User | null>;
  rooms$: Observable<Room[] | null>;

  model = {
    icon: 'chatbubbles-outline',
    title: 'No Chat Rooms',
    color: 'warning',
  };

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService,
    private fcmService: FcmService
  ) {}

  async ngOnInit() {
    this.initValues();
    // Trigger FCM
    this.fcmService.registerPush();
    // Get all chat Rooms
    this.listRooms2();
    //await this.listRooms();
  }

  initValues() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.rooms$ = this.store.pipe(select(roomsSelector));
  }

  listRooms2() {
    this.currentUser$
      .subscribe((user) => {
        if (user) {
          const currentUserId = user.$id;
          this.store.dispatch(getRoomsAction({ currentUserId }));
        }
      })
      .unsubscribe();
  }

  async listRooms() {
    const cUserId = this.authService.getUserId();
    await this.roomService.listRooms(cUserId);
    this.rooms = this.roomService.rooms;
  }

  getChat(room) {
    this.router.navigate(['/', 'home', 'chat', room.$id]);
  }

  openArchiveMessages() {
    console.log('openArchiveMessages clicked');
  }

  handleRefresh(event) {
    this.listRooms();
    event.target.complete();
    console.log('Async operation refresh has ended');
  }

  archiveChat(room) {
    console.log('archiveChat clicked', room);
  }

  messageTime(d: any) {
    if (!d) return null;
    let time = lastSeen(d);
    if (time === 'online') time = 'just now';
    return time;
  }
}
