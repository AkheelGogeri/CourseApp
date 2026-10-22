import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/users';

  readonly currentUser = signal<User | null>(null);

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }
}