import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { RoomService } from 'src/app/services/chat/room.service';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';
import { getRoomsResponseInterface } from 'src/app/models/types/responses/getRoomsResponse.interface';
import {
  getRoomsAction,
  getRoomsFailureAction,
  getRoomsSuccessAction,
} from 'src/app/store/actions/room.action';

@Injectable()
export class RoomEffects {
  getRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRoomsAction),
      switchMap(({ currentUserId }) =>
        this.roomService.listRooms(currentUserId).pipe(
          map((payload: getRoomsResponseInterface) =>
            getRoomsSuccessAction({ payload })
          ),

          catchError((errorResponse: HttpErrorResponse) => {
            const error: ErrorInterface = {
              message: errorResponse.message,
            };
            return of(getRoomsFailureAction({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private roomService: RoomService
  ) {}
}