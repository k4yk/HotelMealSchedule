import { Data, Params } from '@angular/router';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterState {
  readonly url: string;
  readonly root: {
    readonly data: Data;
    readonly queryParams: Params;
  };
}

export const initialState: AppState = {
  router: {
    state: {
      url: '/',
      root: {
        data: {},
        queryParams: {},
      },
    },
    navigationId: -1,
  },
};

export interface AppState {
  readonly router: RouterReducerState<RouterState>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
