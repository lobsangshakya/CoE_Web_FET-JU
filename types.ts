
export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  coeId?: string;
  description?: string;
  // Phase 2 Additions
  last_role_change_at?: string;
  created_by_uid?: string;
  is_active?: boolean;
  force_password_reset?: boolean;
}

export enum PaperStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  department: string;
  abstract: string;
  fileUrl: string;
  doi: string;
  status: PaperStatus;
  submittedBy: string;
  coAuthors?: string;
  submissionDate?: string;
}

export type ProjectLevel = 'University' | 'National' | 'SIH' | 'Internal' | 'UG' | 'PG' | 'PhD';
export type ProjectProgress = 'Proposed' | 'Assigned' | 'Started' | 'In Progress' | 'Approval' | 'Completed' | 'Rejected';

export interface Project {
  id:string;
  title: string;
  description: string;
  team: string[];
  status: 'Ongoing' | 'Completed';
  imageUrl: string;
  labs?: string[];
  patents?: string[];
  funding?: string;
  coeId: string;
  level: ProjectLevel;
  progress: ProjectProgress;
  department: string;
  proposerId: string;
  assignedStudentIds: string[];
  // Phase 2 Additions
  reviewed_by_uid?: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Faculty Achievements' | 'Student Achievements' | 'General';
  author: string;
}

export enum EventStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'Workshop' | 'Hackathon' | 'Guest Lecture' | 'Seminar';
  registeredUsers?: string[];
  status: EventStatus;
  submittedBy: string;
  coeId?: string;
  // Phase 2 Additions
  created_at?: string;
  updated_at?: string;
  is_cancelled?: boolean;
}

export interface CertificateData {
    recipientName: string;
    eventName: string;
    eventDate: string;
    certificateId: string;
}

export interface Achievement {
  id: string;
  title: string;
  recipient: string;
  category: 'Faculty' | 'Student' | 'University';
  date: string;
  description: string;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  likes: string[];
  comments: Comment[];
}

export interface COELeader {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
}

export interface COE {
  id: string;
  name: string;
  longName: string;
  logoUrl: string;
  leader: COELeader;
  facultyIds: string[];
  studentIds: string[];
  tagline: string;
}
