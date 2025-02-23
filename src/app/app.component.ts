import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as UserActions from './store/user.actions';
import * as UserSelectors from './store/user.selectors';
import { Observable, of } from 'rxjs';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { trigger, transition, style, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatFormFieldModule,
     MatInputModule, MatCardModule, MatButtonModule,
     RouterLink, RouterOutlet, FormsModule, HighlightDirective,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  searchId: number | null = null;
  searchResult$: Observable<User | null>;
  private searchInput$ = new Subject<number | null>();
  private previousSearchId: number | null = null;

  constructor(private store: Store) {
    this.searchResult$ = this.store.pipe(select(UserSelectors.selectSearchResult));
    this.searchResult$.subscribe(result => {
    });
    this.searchInput$.pipe(debounceTime(300)).subscribe(id => {
      this.onSearchInputDebounced(id);
    });
  }

  onSearchInput() {
    if (this.searchId !== this.previousSearchId) {
      this.searchInput$.next(this.searchId);
      this.previousSearchId = this.searchId;
    }
  }

  onSearchInputDebounced(id: number | null) {
    if (id !== null) {
      if (id) {
        this.store.dispatch(UserActions.searchUser({ id: id }));
      } else {
        this.store.dispatch(UserActions.searchUserFailure({ error: null }));
        this.store.dispatch(UserActions.clearError());
        this.store.dispatch(UserActions.clearSearchResult()); 
      }
    }
  }
}