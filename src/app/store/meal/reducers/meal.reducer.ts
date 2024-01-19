import { createReducer, on } from '@ngrx/store';
import { MealState, initialState } from './meal.state';
import { SetLoading, getMealData, getMealDataSuccess, saveGuestData, saveGuestDataSuccess, setLoading } from '../actions/meal.actions';

export const mealReducer = createReducer(
  initialState,
  on(
    setLoading,
    (state: MealState, { isLoading }: SetLoading): MealState => ({
      ...state,
      isLoading,
    })
  ),
  on(
    getMealData,
    (state: MealState): MealState => ({
    ...state,
    isLoading: true
  })),
  on(
    getMealDataSuccess,
    (state: MealState, action): MealState => ({
      ...state,
      isLoading: false,
      guestList: action.guestList
    })
  ),
  on(
    saveGuestData,
    (state: MealState): MealState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    saveGuestDataSuccess,
    (state: MealState): MealState => ({
      ...state
    })
  )
);
