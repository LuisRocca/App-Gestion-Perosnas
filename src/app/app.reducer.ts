import { Action, createReducer, on } from '@ngrx/store';
import { AppState, AppActionTypes, AppActions } from './app.state';

const initialState: AppState = {
  user: ''
};

const appReducer = createReducer(
  initialState,
  on(AppActions.SetUser, (state, { payload }) => {
    return {
      ...state,
      user: payload
    };
  })
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
