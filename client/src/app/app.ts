import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserService } from './services/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected userService = inject(UserService);
  private router = inject(Router);
  protected readonly title = signal('Course App');

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  selectUser(id: string): void {
    const user = this.userService.users().find(u => u.id === Number(id)) ?? null;
    this.userService.currentUser.set(user);

    if (!this.userService.isAdmin() && this.router.url.startsWith('/admin')) {
      this.router.navigate(['/courses']);
    }
  }
}