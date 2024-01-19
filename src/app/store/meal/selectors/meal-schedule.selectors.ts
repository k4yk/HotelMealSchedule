import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MealState } from '../reducers/meal.state';

export const MEAL_STORE_KEY = 'meal';

export const selectMealState = createFeatureSelector<MealState>(MEAL_STORE_KEY);

export const selectIsLoading = createSelector(
  selectMealState,
  (state: MealState) => state.isLoading
);

export const guestListSelector = createSelector(
  selectMealState,
  (state: MealState) => state.guestList
);
