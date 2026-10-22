export interface Enrollment {
  id: number;
  userId: number;
  userName: string;
  courseId: number;
  courseTitle: string;
  status: 'NotStarted' | 'InProgress' | 'Completed';
  enrolledAt: string;
  completedAt: string | null;
}