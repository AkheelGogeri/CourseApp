import { Component, OnInit, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { UserService } from '../../services/user';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-catalog',
  imports: [],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css'
})
export class CourseCatalog implements OnInit {
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  protected userService = inject(UserService);

  protected readonly courses = signal<Course[]>([]);
  protected readonly message = signal('');

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: data => this.courses.set(data),
      error: err => console.error(err)
    });
  }

  enroll(course: Course): void {
    const user = this.userService.currentUser();
    if (!user) return;

    this.enrollmentService.enroll(user.id, course.id).subscribe({
      next: e => this.message.set(`✅ ${e.userName} enrolled in ${e.courseTitle}`),
      error: err => this.message.set(
        typeof err.error === 'string' ? `⚠️ ${err.error}` : '⚠️ Enrollment failed.'
      )
    });
  }
}