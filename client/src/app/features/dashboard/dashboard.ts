import { Component, computed, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { UserService } from '../../services/user';
import { Enrollment, EnrollmentStatus } from '../../models/enrollment';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private enrollmentService = inject(EnrollmentService);
  protected userService = inject(UserService);

  protected readonly enrollments = signal<Enrollment[]>([]);
  protected readonly message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  protected readonly statuses: EnrollmentStatus[] = ['NotStarted', 'InProgress', 'Completed'];
  protected readonly labels: Record<EnrollmentStatus, string> = {
    NotStarted: 'Not started',
    InProgress: 'In progress',
    Completed: 'Completed'
  };

  protected readonly isAdmin = this.userService.isAdmin;
  protected readonly stats = computed(() => {
    const list = this.enrollments();
    const count = (s: EnrollmentStatus) => list.filter(e => e.status === s).length;
    const completed = count('Completed');
    return {
      total: list.length,
      notStarted: count('NotStarted'),
      inProgress: count('InProgress'),
      completed,
      percent: list.length ? Math.round((completed / list.length) * 100) : 0
    };
  });

  constructor() {
    effect(() => {
      this.load(this.userService.currentUser());
    });
  }

    private load(user: User | null): void {
      if (!user) {
        this.enrollments.set([]);
        return;
      }
    
      const request = user.role === 'Admin'
        ? this.enrollmentService.getAll()
        : this.enrollmentService.getForUser(user.id);
    
      request.subscribe({
        next: data => this.enrollments.set(data),
        error: () => this.message.set({ type: 'error', text: 'Could not load enrollments.' })
      });
    }
  
  changeStatus(enrollment: Enrollment, status: EnrollmentStatus): void {
    this.enrollmentService.updateStatus(enrollment.id, status).subscribe({
      next: () => {
        this.message.set({ type: 'success', text: `${enrollment.courseTitle} marked as ${this.labels[status]}` });
        this.load(this.userService.currentUser());
      },
      error: () => this.message.set({ type: 'error', text: 'Could not update status.' })
    });
  }
}