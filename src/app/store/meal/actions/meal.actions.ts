import { createAction, props } from '@ngrx/store';
import { Guest } from 'src/app/interfaces/guest.interface';
import { GuestList } from 'src/app/interfaces/guestList.interface';

const actionPrefix = '[Meal]';

export interface SetLoading {
  readonly isLoading: boolean;
}

export interface MealData {
  readonly guestList: GuestList[];
}

export interface GuestData {
  readonly guest: string;
}

export const setLoading = createAction(
  `${actionPrefix} Set Loading`,
  props<SetLoading>()
);

export const getTestData = createAction(`${actionPrefix} Get test data`);

export const getMealData = createAction(`${actionPrefix} Get Meal data`);
export const getMealDataSuccess = createAction(`${actionPrefix} Get Meal data success`, props<MealData>());

export const saveGuestData = createAction(`${actionPrefix} Save guest data`, props<GuestData>());
export const saveGuestDataSuccess = createAction(`${actionPrefix} Save guest data success`);