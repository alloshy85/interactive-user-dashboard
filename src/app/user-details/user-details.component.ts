import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as UserActions from '../store/user.actions';
import * as UserSelectors from '../store/user.selectors';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatCardModule,
     MatProgressBarModule, RouterLink,
     MatListModule,MatIconModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.loading$ = this.store.pipe(select(UserSelectors.selectLoading));
    this.user$ = this.store.pipe(select(UserSelectors.selectSelectedUser));
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(UserActions.loadUser({ id }));
  }
}