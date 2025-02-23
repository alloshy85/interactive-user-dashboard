import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable, of } from 'rxjs';
    import { User, UserResponse } from './models/user.model';
    import { tap, map } from 'rxjs/operators';
    import { CacheService } from './cache.service';

    @Injectable({
      providedIn: 'root'
    })
    export class UsersService {
      private baseUrl = 'https://reqres.in/api/users';

      constructor(private http: HttpClient, private cacheService: CacheService) { }

      getUsers(page: number): Observable<any> {
        return this.http.get<any>(`https://reqres.in/api/users?page=${page}`).pipe(
        );
      }

      getUser(id: number): Observable<{ data: User }> {
        const cacheKey = `user-${id}`;
        if (this.cacheService.hasExpired(cacheKey)) {
          this.cacheService.remove(cacheKey);
        }
        const cachedData = this.cacheService.get(cacheKey);
        if (cachedData) {
          return of({ data: cachedData });
        }

        return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`).pipe(
          map(response => {
            this.cacheService.set(cacheKey, response.data, 60000);
            return response;
          }),
        );
      }
    }