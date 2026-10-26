import { Routes } from '@angular/router';
import { CourseCatalog } from './features/course-catalog/course-catalog';
import { Register } from './features/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { AdminCourses } from './features/admin-courses/admin-courses';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CourseCatalog },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'admin/courses', component: AdminCourses, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'courses' }
];