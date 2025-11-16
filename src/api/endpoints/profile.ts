/**
 * Student Profile API Endpoints
 */

import { api } from '../client';
import {
  StudentProfileResponse,
  StudentProfileCreateRequest,
  StudentProfileUpdateRequest,
} from '../../types/api';

export const profileAPI = {
  /**
   * Create a new student profile
   */
  createProfile: (data: StudentProfileCreateRequest) => {
    return api.post<StudentProfileResponse>('/api/students/register', data);
  },

  /**
   * Get student profile by ID
   */
  getProfileById: (studentId: string) => {
    return api.get<StudentProfileResponse>(`/api/students/${studentId}`);
  },

  /**
   * Get student profile by user ID
   */
  getProfileByUserId: (userId: string) => {
    return api.get<StudentProfileResponse>(`/api/students/user/${userId}`);
  },

  /**
   * Update student profile
   */
  updateProfile: (studentId: string, data: StudentProfileUpdateRequest) => {
    return api.put<StudentProfileResponse>(`/api/students/${studentId}`, data);
  },

  /**
   * Delete student profile
   */
  deleteProfile: (studentId: string) => {
    return api.delete(`/api/students/${studentId}`);
  },
};

