
import { UserRole } from './types';
import type { User } from './types';

export const ROLES = {
  ADMIN: UserRole.ADMIN,
  FACULTY: UserRole.FACULTY,
  STUDENT: UserRole.STUDENT,
  GUEST: UserRole.GUEST,
};

export const MOCK_USERS: Record<string, User> = {
  'student@jain.com': {
    id: 'user-1',
    name: 'Priya Sharma',
    email: 'student@jain.com',
    role: ROLES.STUDENT,
    avatarUrl: 'https://picsum.photos/seed/student/100/100',
    department: 'Computer Science',
  },
  'faculty@jain.com': {
    id: 'user-2',
    name: 'Dr. Ramesh Kumar',
    email: 'faculty@jain.com',
    role: ROLES.FACULTY,
    avatarUrl: 'https://picsum.photos/seed/faculty/100/100',
    department: 'Electronics Engineering',
  },
  'admin@jain.com': {
    id: 'user-3',
    name: 'Admin',
    email: 'admin@jain.com',
    role: ROLES.ADMIN,
    avatarUrl: 'https://picsum.photos/seed/admin/100/100',
  },
};
