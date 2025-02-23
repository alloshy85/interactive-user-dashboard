// src/app/users.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { User, UserResponse } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://reqres.in/api/users';
  isLoading: boolean = false; // Add isLoading property

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<UserResponse> {
    this.isLoading = true; // Set isLoading to true
    return this.http.get<UserResponse>(`${this.baseUrl}?page=${page}`).pipe(
      finalize(() => this.isLoading = false) // Set isLoading to false
    );
  }

  getUser(id: number): Observable<{ data: User }> {
    this.isLoading = true; // Set isLoading to true
    return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`).pipe(
      finalize(() => this.isLoading = false) // Set isLoading to false
    );
  }
}