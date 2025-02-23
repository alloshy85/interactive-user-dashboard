import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
];