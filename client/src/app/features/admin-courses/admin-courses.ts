import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';

@Component({
  selector: 'app-admin-courses',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.css'
})
export class AdminCourses implements OnInit {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  protected readonly courses = signal<Course[]>([]);
  protected readonly editingId = signal<number | null>(null);
  protected readonly message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  protected form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    description: [''],
    category: ['', Validators.required],
    durationHours: [1, [Validators.required, Validators.min(1), Validators.max(1000)]]
  });

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.courseService.getCourses().subscribe({
      next: data => this.courses.set(data),
      error: () => this.message.set({ type: 'error', text: 'Could not load courses.' })
    });
  }

  edit(course: Course): void {
    this.editingId.set(course.id);
    this.form.setValue({
      title: course.title,
      description: course.description ?? '',
      category: course.category,
      durationHours: course.durationHours
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancel(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.getRawValue();
    const id = this.editingId();

    const request: Observable<unknown> = id === null
      ? this.courseService.create(dto)
      : this.courseService.update(id, dto);

    request.subscribe({
      next: () => {
        this.message.set({ type: 'success', text: `${dto.title} ${id === null ? 'added' : 'updated'}` });
        this.cancel();
        this.load();
      },
      error: () => this.message.set({ type: 'error', text: 'Could not save the course. Check the fields.' })
    });
  }

  remove(course: Course): void {
    if (!confirm(`Delete "${course.title}"? It will be hidden from the catalog.`)) return;

    this.courseService.delete(course.id).subscribe({
      next: () => {
        this.message.set({ type: 'success', text: `${course.title} deleted` });
        this.load();
      },
      error: () => this.message.set({ type: 'error', text: 'Could not delete the course.' })
    });
  }
}