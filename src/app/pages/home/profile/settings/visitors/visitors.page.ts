import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { User } from 'src/app/models/User';
import { Visit } from 'src/app/models/Visit';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { getVisitsAction } from 'src/app/store/actions/visits.action';
import { currentUserSelector } from 'src/app/store/selectors/auth.selector';
import {
  errorSelector,
  isLoadingSelector,
  totalSelector,
  visitsSelector,
} from 'src/app/store/selectors/visits.selector';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.page.html',
  styleUrls: ['./visitors.page.scss'],
})
export class VisitorsPage implements OnInit {
  subscription: Subscription;

  currentUser$: Observable<User | null> = null;
  isLoading$: Observable<boolean> = null;
  visits$: Observable<Visit[] | null> = null;
  total$: Observable<number | null> = null;

  constructor(private store: Store, private toastController: ToastController) {}

  ngOnInit() {
    this.initValues();
    // Get all chat Rooms
    this.listVisits();
  }

  ionViewWillEnter() {
    this.subscription = new Subscription();

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
  }

  ionViewWillLeave() {
    // Unsubscribe from all subscriptions
    this.subscription.unsubscribe();
  }

  initValues() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.visits$ = this.store.pipe(select(visitsSelector));
    this.total$ = this.store.pipe(select(totalSelector));
  }

  listVisits() {
    // Dispatch action to get all visits
    this.store.dispatch(getVisitsAction());
  }

  //
  // Pull to refresh
  //

  handleRefresh(event) {
    this.listVisits();
    if (event) event.target.complete();
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
