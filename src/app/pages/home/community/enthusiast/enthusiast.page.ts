import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/User';
import { FilterDataInterface } from 'src/app/models/types/filterData.interface';
import { FilterService } from 'src/app/services/filter/filter.service';
import {
  getUsersByCompletedProfileAction,
  getUsersByCompletedProfileWithOffsetAction,
} from 'src/app/store/actions/users.action';
import { currentUserSelector } from 'src/app/store/selectors/auth.selector';
import {
  isLoadingByCompletedProfileSelector,
  totalByCompletedProfileSelector,
  usersByCompletedProfileSelector,
} from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-enthusiast',
  templateUrl: './enthusiast.page.html',
  styleUrls: ['./enthusiast.page.scss'],
})
export class EnthusiastPage implements OnInit {
  filter$: any;
  filterData: FilterDataInterface;

  isLoading$: Observable<boolean>;
  currentUser$: Observable<User>;
  usersByCompletedProfile$: Observable<User[] | null> = null;
  totalByCompletedProfile$: Observable<number | null> = null;

  constructor(
    private store: Store,
    private router: Router,
    private filterService: FilterService
  ) {}

  async ngOnInit() {
    this.initValues();

    // Check Local Storage for filters
    await this.checkFilter();
  }

  initValues(): void {
    // Set values from selectors
    this.currentUser$ = this.store.pipe(select(currentUserSelector));

    this.isLoading$ = this.store.pipe(
      select(isLoadingByCompletedProfileSelector)
    );
    this.usersByCompletedProfile$ = this.store.pipe(
      select(usersByCompletedProfileSelector)
    );
    this.totalByCompletedProfile$ = this.store.pipe(
      select(totalByCompletedProfileSelector)
    );
  }

  //
  // Get Users
  //

  listUsers() {
    const filterData = this.filterData;
    this.store.dispatch(
      getUsersByCompletedProfileAction({ request: { filterData } })
    );
  }

  //
  // Check Filter
  //

  async checkFilter() {
    this.filter$ = this.filterService
      .getEvent()
      .subscribe((filterData: FilterDataInterface) => {
        this.filterData = filterData;
        // console.log('Subscribed filter: ', filterData);

        // List Users
        this.listUsers();
      });
  }

  //
  // Routes
  //

  getUserPage(id: string): void {
    this.router.navigate([`/home/user/${id}`]);
  }

  //
  // Pull to refresh
  //

  handleRefresh(event) {
    this.listUsers();
    if (event) event.target.complete();
  }

  //
  // Infinite Scroll
  //

  loadMore(event) {
    // Offset is the number of users already loaded
    let offset: number = 0;
    this.usersByCompletedProfile$
      .subscribe((users) => {
        offset = users.length;
        this.totalByCompletedProfile$
          .subscribe((total) => {
            if (offset < total) {
              const filterData = this.filterData;
              this.store.dispatch(
                getUsersByCompletedProfileWithOffsetAction({
                  request: {
                    filterData,
                    offset,
                  },
                })
              );
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
}
