import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { CreateUser } from '../models/create-user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/users';

  readonly users = signal<User[]>([]);
  readonly currentUser = signal<User | null>(null);

  loadUsers(): void {
    this.http.get<User[]>(this.baseUrl).subscribe({
      next: data => this.users.set(data),
      error: err => console.error(err)
    });
  }

  register(user: CreateUser) {
    return this.http.post<User>(this.baseUrl, user);
  }
}