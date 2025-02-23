import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectSearchResult = createSelector(
  selectUserState,
  (state: UserState) => state.searchResult
);

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectTotalPages = createSelector(
  selectUserState,
  (state: UserState) => state.totalPages
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

export const selectUser = (id: number) => createSelector(
  selectUsers,
  (users) => users.find(user => user.id === id)
);