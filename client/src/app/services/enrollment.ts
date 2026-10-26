import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enrollment, EnrollmentStatus } from '../models/enrollment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/enrollments';

  enroll(userId: number, courseId: number) {
    return this.http.post<Enrollment>(this.baseUrl, { userId, courseId });
  }

  getAll() {
    return this.http.get<Enrollment[]>(this.baseUrl);
  }

  getForUser(userId: number) {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/user/${userId}`);
  }

  updateStatus(id: number, status: EnrollmentStatus) {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { status });
  }
}