import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  protected userService = inject(UserService);
  protected readonly message = signal('');

  protected form = this.fb.nonNullable.group({
    employeeId: ['', Validators.required],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    joiningDate: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.register(this.form.getRawValue()).subscribe({
      next: user => {
        this.message.set(`✅ ${user.name} registered successfully`);
        this.form.reset();
        this.userService.loadUsers();
      },
      error: err => this.message.set(
        typeof err.error === 'string' ? `⚠️ ${err.error}` : '⚠️ Registration failed. Check the fields.'
      )
    });
  }
}