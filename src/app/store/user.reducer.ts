import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UserActions from './user.actions';

export interface UserState {
  searchResult: User | null;
  error: any;
  users: User[];
  totalPages: number;
  loading: boolean;
  selectedUser: User | null;
}

export const initialState: UserState = {
  searchResult: null,
  error: null,
  users: [],
  totalPages: 1,
  loading: false,
  selectedUser: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.searchUserSuccess, (state, { user }) => ({
    ...state,
    searchResult: user,
    error: null,
  })),
  on(UserActions.searchUserFailure, (state, { error }) => ({
    ...state,
    searchResult: null,
    error,
  })),
  on(UserActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(UserActions.clearSearchResult, (state) => ({
    ...state,
    searchResult: null,
  })),
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, { users, totalPages }) => ({
    ...state,
    users,
    totalPages,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);