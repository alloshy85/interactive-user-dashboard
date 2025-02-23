import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import * as UserActions from '../store/user.actions';
import * as UserSelectors from '../store/user.selectors';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatProgressBarModule, RouterLink, FormsModule, MatPaginatorModule, MatInputModule, MatIconModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  totalPages$: Observable<number>;
  currentPage: number = 1;
  searchTerm: string = '';
  private searchTerm$ = new Subject<string>();

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    this.users$ = this.store.pipe(select(UserSelectors.selectUsers));
    this.loading$ = this.store.pipe(select(UserSelectors.selectLoading));
    this.totalPages$ = this.store.pipe(select(UserSelectors.selectTotalPages));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page'] || '1');
      this.searchTerm = params['search'] || '';
      this.store.dispatch(UserActions.loadUsers({ page: this.currentPage }));
    });

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateQueryParams();
      this.store.dispatch(UserActions.loadUsers({ page: this.currentPage }));
    });
  }

  onSearchInput() {
    this.searchTerm$.next(this.searchTerm);
  }

  changePage(page: number) {
    this.totalPages$.subscribe(totalPages => {
      if (page >= 1 && page <= totalPages) {
        this.currentPage = page;
        this.updateQueryParams();
        this.store.dispatch(UserActions.loadUsers({ page: this.currentPage }));
      }
    });
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, search: this.searchTerm },
      queryParamsHandling: 'merge'
    });
  }

  onUserClick(userId: number) {
    this.router.navigate(['/user', userId]);
  }


  previousPage() {
    this.changePage(this.currentPage - 1);
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }
}