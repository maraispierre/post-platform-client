import { createFeatureSelector } from '@ngrx/store';

import * as auth from './auth/auth.reducers';
import * as post from './post/post.reducers';

export interface AppState {
  authState: auth.State;
}

export const reducers: any = {
  auth: auth.reducer,
  post: post.reducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectPostState = createFeatureSelector<AppState>('post');
