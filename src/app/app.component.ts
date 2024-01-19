import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setLoading } from './store/meal/actions/meal.actions';
import { selectIsLoading } from './store/meal/selectors/meal-schedule.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly isLoading$ = this.store.select(selectIsLoading);

  constructor(private readonly store: Store) {}

  onGuestAdded(guest: any) {
    this.store.dispatch(setLoading({ isLoading: true }));
  }
}
