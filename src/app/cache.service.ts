
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  get(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  set(key: string, data: any, expirationTime: number = 0): void {
    const item = {
      data: data,
      expiry: expirationTime > 0 ? Date.now() + expirationTime : 0
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  hasExpired(key: string): boolean {
    const item = this.get(key);
    if (item && item.expiry > 0 && Date.now() > item.expiry) {
      this.remove(key);
      return true;
    }
    return false;
  }
}