import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from '../models/enrollment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/enrollments';

  enroll(userId: number, courseId: number) {
    return this.http.post<Enrollment>(this.baseUrl, { userId, courseId });
  }
}