import { InjectionToken, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MEAL_STORE_KEY } from './selectors/meal-schedule.selectors';
import { mealReducer } from './reducers/meal.reducer';
import { MealEffects } from './effects/meal.effects';

export const MEAL_REDUCER_INJECT_TOKEN = new InjectionToken('MEAL_REDUCER');

@NgModule({
  imports: [
    StoreModule.forFeature(MEAL_STORE_KEY, MEAL_REDUCER_INJECT_TOKEN),
    EffectsModule.forFeature([MealEffects]),
  ],
  providers: [
    {
      provide: MEAL_REDUCER_INJECT_TOKEN,
      useValue: mealReducer,
    },
  ],
})
export class MealStoreModule {}
