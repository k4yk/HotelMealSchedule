import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GuestList } from 'src/app/interfaces/guestList.interface';
import * as MealActions from 'src/app/store/meal/actions/meal.actions';
import { guestListSelector, selectIsLoading } from 'src/app/store/meal/selectors/meal-schedule.selectors';

@Component({
  selector: 'meal-schedule',
  templateUrl: './mealSchedule.component.html',
  styleUrls: ['./mealSchedule.component.scss'],
})
export class MealSchedule implements OnInit {
  isLoading$: Observable<boolean>;
  guestList$: Observable<GuestList[]>;
  public guestList: GuestList[] = [];

  constructor(private store: Store) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.guestList$ = this.store.pipe(select(guestListSelector));
   }

  ngOnInit() {
    this.store.dispatch(MealActions.getMealData());
  }
}
