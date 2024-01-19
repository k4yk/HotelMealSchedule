import { GuestList } from "src/app/interfaces/guestList.interface";

export interface MealState {
  readonly isLoading: boolean;
  readonly guestList: GuestList[];
}

export const initialState: MealState = {
  isLoading: false,
  guestList: []
};
