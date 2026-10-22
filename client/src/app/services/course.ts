import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/courses';

  getCourses() {
    return this.http.get<Course[]>(this.baseUrl);
  }
}