
import { UserRole } from '../types';

/**
 * PHASE 2: AUTHENTICATION & ACCESS CONTROL
 * 
 * 1. Firebase Flow:
 *    - Admin creates user in the "Users" sheet.
 *    - Firebase account is created with fixed username/auto-generated password.
 *    - Upon first login, Firebase UID is mapped to the "AuthMapping" sheet.
 * 
 * 2. Mapping:
 *    - Firebase UID acts as the Primary Key (PK) for Auth.
 *    - It maps to the Google Sheets 'uid' field to fetch role and permissions.
 * 
 * 3. Role-Based Access Control (RBAC):
 */

export const PERMISSIONS = {
  [UserRole.STUDENT]: {
    canSubmitProject: true,
    canViewOwnProjects: true,
    canApproveProjects: false,
    canManageUsers: false,
    canCreateEvents: false,
  },
  [UserRole.FACULTY]: {
    canSubmitProject: true,
    canViewOwnProjects: true,
    canApproveProjects: true, // Review phase
    canManageUsers: false,
    canCreateEvents: true,
  },
  [UserRole.ADMIN]: {
    canSubmitProject: true,
    canViewOwnProjects: true,
    canApproveProjects: true, // Final approval
    canManageUsers: true,
    canCreateEvents: true,
  },
  [UserRole.GUEST]: {
    canSubmitProject: false,
    canViewOwnProjects: false,
    canApproveProjects: false,
    canManageUsers: false,
    canCreateEvents: false,
  }
};

/**
 * Validates if a user has permission to perform a specific action.
 */
export const checkPermission = (userRole: UserRole, action: keyof typeof PERMISSIONS[UserRole.ADMIN]): boolean => {
  return PERMISSIONS[userRole]?.[action] ?? false;
};

/**
 * Utility to generate a secure random password for initial account creation.
 */
export const generateInitialPassword = (): string => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0, n = charset.length; i < 12; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
