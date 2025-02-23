import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { SearchService } from '../search.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions); // Use inject here
  private searchService = inject(SearchService);

  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUser),
      mergeMap(({ id }) =>
        this.searchService.getUserById(id).pipe(
          map((user) => {
            console.log('UserEffects: searchUserSuccess', user);
            return UserActions.searchUserSuccess({ user });
          }),
          catchError((error) => of(UserActions.searchUserFailure({ error })))
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(({ page }) =>
        this.searchService.getUsers(page).pipe(
          map((response) => {
            console.log('UserEffects: loadUsersSuccess', response);
            return UserActions.loadUsersSuccess({ users: response.data, totalPages: response.total_pages });
          }),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(({ id }) =>
        this.searchService.getUserById(id).pipe(
          map((user) => {
            console.log('UserEffects: loadUserSuccess', user);
            return UserActions.loadUserSuccess({ user });
          }),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );
}