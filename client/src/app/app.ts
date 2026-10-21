import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './models/course';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);

  protected readonly title = signal('Course App');
  protected readonly courses = signal<Course[]>([]);

  ngOnInit(): void {
    this.http.get<Course[]>('https://localhost:5001/api/courses').subscribe({
      next: data => this.courses.set(data),
      error: err => console.error(err)
    });
  }
}