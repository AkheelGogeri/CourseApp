import { Component, OnInit, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-catalog',
  imports: [],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css'
})
export class CourseCatalog implements OnInit {
  private courseService = inject(CourseService);
  protected readonly courses = signal<Course[]>([]);

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: data => this.courses.set(data),
      error: err => console.error(err)
    });
  }
}