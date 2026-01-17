
import { UserRole, User } from '../types';
import { secureFetch } from './apiService';

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

// Firebase instance would be imported from the main app
// This service assumes Firebase is already initialized elsewhere

// Mock functions for Firebase integration
export const getCurrentUserToken = async (): Promise<string | null> => {
  // In a real implementation, this would get the current Firebase user's ID token
  // For now, we'll return null or get from localStorage
  return localStorage.getItem('firebase_token');
};

export const setCurrentUserToken = (token: string) => {
  localStorage.setItem('firebase_token', token);
};

export const clearCurrentUserToken = () => {
  localStorage.removeItem('firebase_token');
};

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
 * Gets the user profile from the backend using the Firebase token
 */
export const getUserProfile = async (token: string): Promise<User | null> => {
  try {
    const response = await secureFetch('getUser', { uid: 'self' }, token);
    
    if (response.success && response.user) {
      // Map the response to our User type
      return {
        id: response.user.uid,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role as UserRole,
        department: response.user.department,
        coeId: response.user.coe_id,
        description: response.user.description,
        is_active: response.user.is_active,
        force_password_reset: response.user.force_password_reset
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Creates a new user in the system (requires admin privileges)
 */
export const createUser = async (token: string, userData: Omit<User, 'id'>): Promise<boolean> => {
  try {
    const response = await secureFetch('createUser', {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      coe_id: userData.coeId,
      description: userData.description
    }, token);
    
    return response.success;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
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
