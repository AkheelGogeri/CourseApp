import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { CreateCourse } from '../models/create-course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/courses';

  getCourses() {
    return this.http.get<Course[]>(this.baseUrl);
  }

    create(course: CreateCourse) {
    return this.http.post<Course>(this.baseUrl, course);
  }

  update(id: number, course: CreateCourse) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, course);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}