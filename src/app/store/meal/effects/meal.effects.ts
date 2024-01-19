import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getMealData, getMealDataSuccess, getTestData, saveGuestData, saveGuestDataSuccess } from '../actions/meal.actions';
import { MealService } from '../../../services/meal.service';

@Injectable()
export class MealEffects {
  getTestData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getTestData),
        switchMap(() => this.mealService.getTestData()),
        tap((response: any) => {
          console.log('🚀 ~ MealEffects ~ tap ~ response:', response);
        })
      ),
    { dispatch: false }
  );

  getMealData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getMealData, saveGuestDataSuccess),
        mergeMap(() => {
          return this.mealService.getMealData().pipe(map(res => getMealDataSuccess({guestList: this.mealService.createGuestListFromData(res)})))
        })
      )
  );

  saveGuestData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveGuestData),
        mergeMap((action) => {
          return this.mealService.saveMealData(action.guest).pipe(map(res => saveGuestDataSuccess()))
        })
      )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly router: Router,
    private readonly mealService: MealService
  ) {}
}
