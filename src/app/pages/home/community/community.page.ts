import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, filter, take } from 'rxjs';

// Interface Imports
import { User } from 'src/app/models/User';
import { FilterDataInterface } from 'src/app/models/types/filterData.interface';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { RoomExtendedInterface } from 'src/app/models/types/roomExtended.interface';

// Service Imports
import { StorageService } from 'src/app/services/storage/storage.service';
import { FilterService } from 'src/app/services/filter/filter.service';

// Action Imports
import { activateRoomAction } from 'src/app/store/actions/message.action';
import {
  createRoomInitialStateAction,
  getRoomAction,
} from 'src/app/store/actions/room.action';
import {
  getUsersAction,
  getUsersWithOffsetAction,
} from 'src/app/store/actions/users.action';

// Selector Imports
import { currentUserSelector } from 'src/app/store/selectors/auth.selector';
import { isLoadingSelector as isLoadingRoomStateSelector } from 'src/app/store/selectors/room.selector';
import {
  createRoomErrorSelector,
  roomsSelector,
} from 'src/app/store/selectors/room.selector';
import {
  isLoadingSelector as isLoadingUserStateSelector,
  usersSelector,
  totalSelector,
  errorSelector,
} from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  subscription: Subscription;

  filter$: any;
  filterData: FilterDataInterface;

  currentUser$: Observable<User>;
  isLoadingUserState$: Observable<boolean>;
  isLoadingRoomState$: Observable<boolean>;
  users$: Observable<User[] | null> = null;
  total$: Observable<number | null> = null;

  rooms$: Observable<RoomExtendedInterface[] | null> = null;

  constructor(
    private store: Store,
    private router: Router,
    private filterService: FilterService,
    private storageService: StorageService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    // Init values
    this.initValues();

    // Check Local Storage for filters
    await this.checkLocalStorage();
    await this.checkFilter();
  }

  ionViewWillEnter() {
    this.subscription = new Subscription();

    // Loading
    this.subscription.add(
      this.isLoadingRoomState$.subscribe((isLoading) => {
        this.loadingController(isLoading);
      })
    );

    // User Errors
    this.subscription.add(
      this.store
        .pipe(select(errorSelector))
        .subscribe((error: ErrorInterface) => {
          if (error) {
            this.presentToast(error.message, 'danger');
          }
        })
    );

    this.subscription.add(
      this.store
        .pipe(select(createRoomErrorSelector))
        .subscribe((error: ErrorInterface) => {
          if (error) {
            this.presentToast(error.message, 'danger');
            // Clear the error state
            this.store.dispatch(createRoomInitialStateAction());
          }
        })
    );
  }

  ionViewWillLeave() {
    this.isLoadingOverlayActive
      .pipe(
        filter((isActive) => !isActive),
        take(1)
      )
      .subscribe(async () => {
        if (this.loadingOverlay) {
          await this.loadingOverlay.dismiss();
          this.loadingOverlay = undefined;
        }
      });

    // Unsubscribe from all subscriptions
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    console.log('filters unsubscribed');
  }

  initValues(): void {
    // Set values from selectors
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.users$ = this.store.pipe(select(usersSelector));
    this.total$ = this.store.pipe(select(totalSelector));
    this.isLoadingUserState$ = this.store.pipe(
      select(isLoadingUserStateSelector)
    );
    this.isLoadingRoomState$ = this.store.pipe(
      select(isLoadingRoomStateSelector)
    );

    this.rooms$ = this.store.pipe(select(roomsSelector));
  }

  //
  // Get Users
  //

  listUsers() {
    const filterData = this.filterData;
    this.store.dispatch(getUsersAction({ request: { filterData } }));
  }

  //
  // Check Filter
  //

  async checkFilter() {
    this.filter$ = this.filterService
      .getEvent()
      .subscribe((filterData: FilterDataInterface) => {
        this.filterData = filterData;
        console.log('Subscribed filter: ', filterData);

        // List Users
        this.listUsers();
      });
  }

  // TODO: #246 Save filterData with JSON.stringify();
  async checkLocalStorage() {
    // Getting the filter data from Capacitor Preferences
    let languagesString =
      (await this.storageService.getValue('languages')) || [];
    const gender = (await this.storageService.getValue('gender')) || null;
    const country = (await this.storageService.getValue('country')) || null;
    const minAgeString = (await this.storageService.getValue('minAge')) || null;
    const maxAgeString = (await this.storageService.getValue('maxAge')) || null;

    let minAge = Number(minAgeString) || null;
    let maxAge = Number(maxAgeString) || null;

    // TODO: Do better logic here
    let languages: Array<any> = [];
    if (languagesString) {
      languages = languagesString.toLocaleString().split(',');
      if (languages.length === 1 && languages[0] === '') {
        languages = [];
      }
    }

    let filterData: FilterDataInterface = {
      languages: languages,
      gender: gender,
      country: country,
      minAge: minAge,
      maxAge: maxAge,
    };

    console.log('checkLocalStorage', filterData);
    this.filterService.setEvent(filterData);
  }

  //
  // Get or Create Room
  //

  getRoom(userId: string) {
    this.rooms$
      .subscribe((rooms) => {
        this.currentUser$
          .subscribe((user) => {
            const currentUserId = user.$id;
            if (rooms) {
              const room = rooms.find(
                (room) =>
                  room.users.includes(currentUserId) &&
                  room.users.includes(userId)
              );
              if (room) {
                this.store.dispatch(activateRoomAction({ payload: room }));
              } else {
                this.store.dispatch(getRoomAction({ currentUserId, userId }));
              }
            } else {
              this.store.dispatch(getRoomAction({ currentUserId, userId }));
            }
          })
          .unsubscribe();
      })
      .unsubscribe();
  }

  //
  // Infinite Scroll
  //

  loadMore(event) {
    // Offset is the number of users already loaded
    let offset: number = 0;
    this.users$
      .subscribe((users) => {
        offset = users.length;
        this.total$
          .subscribe((total) => {
            if (offset < total) {
              this.currentUser$.subscribe((user) => {
                if (!user) return;
                const currentUserId = user.$id;
                // console.log('Current user: ', currentUserId);
                const filterData = this.filterData;
                this.store.dispatch(
                  getUsersWithOffsetAction({
                    currentUserId,
                    filterData,
                    offset,
                  })
                );
              });
            } else {
              console.log('All users loaded');
            }
          })
          .unsubscribe();
      })
      .unsubscribe();

    // this.getUsers(this.filterData);
    event.target.complete();
  }

  //
  // Pull to refresh
  //

  handleRefresh(event) {
    this.listUsers();
    if (event) event.target.complete();
  }

  //
  // Filters
  //

  getFiltersPage() {
    this.router.navigateByUrl('/home/filters');
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

  //
  // Loading Controller
  //

  private loadingOverlay: HTMLIonLoadingElement;
  private isLoadingOverlayActive = new BehaviorSubject<boolean>(false);
  async loadingController(isLoading: boolean) {
    if (isLoading) {
      if (!this.loadingOverlay) {
        this.isLoadingOverlayActive.next(true);
        this.loadingOverlay = await this.loadingCtrl.create({
          message: 'Please wait...',
        });
        await this.loadingOverlay.present();
        this.isLoadingOverlayActive.next(false);
      }
    } else if (this.loadingOverlay) {
      this.isLoadingOverlayActive.next(true);
      await this.loadingOverlay.dismiss();
      this.loadingOverlay = undefined;
      this.isLoadingOverlayActive.next(false);
    }
  }
}
