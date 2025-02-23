import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const searchUser = createAction('[User] Search User', props<{ id: number }>());
export const searchUserSuccess = createAction('[User] Search User Success', props<{ user: User }>());
export const searchUserFailure = createAction('[User] Search User Failure', props<{ error: any }>());
export const clearError = createAction('[User] Clear Error');
export const clearSearchResult = createAction('[User] Clear Search Result');

export const loadUsers = createAction('[User] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[], totalPages: number }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());

export const loadUser = createAction('[User] Load User', props<{ id: number }>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());