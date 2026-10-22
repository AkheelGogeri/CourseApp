import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from './services/user';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private userService = inject(UserService);
  protected readonly title = signal('Course App');
  protected readonly users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => this.users.set(data),
      error: err => console.error(err)
    });
  }

  selectUser(id: string): void {
    const user = this.users().find(u => u.id === Number(id)) ?? null;
    this.userService.currentUser.set(user);
  }
}