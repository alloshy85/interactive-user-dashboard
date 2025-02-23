import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { User } from './models/user.model';

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/users/${id}`).pipe(
      map(response => response.data)
    );
  }

  getUsers(page: number): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users?page=${page}`);
  }
}