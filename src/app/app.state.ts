import { Action } from '@ngrx/store';

export interface AppState {
  user: string;
}

export enum AppActionTypes {
  SetUser = '[App] Set User'
}

export class SetUser implements Action {
  readonly type = AppActionTypes.SetUser;
  constructor(public payload: string) {}
}

export type AppActions = SetUser;
