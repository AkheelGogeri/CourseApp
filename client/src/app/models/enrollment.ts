export type EnrollmentStatus = 'NotStarted' | 'InProgress' | 'Completed';

export interface Enrollment {
  id: number;
  userId: number;
  userName: string;
  courseId: number;
  courseTitle: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt: string | null;
}