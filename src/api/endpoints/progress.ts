/**
 * Progress API Endpoints
 * Manages study progress tracking
 */

import { api } from '../client';
import {
  ProgressEntryResponse,
  ProgressEntryCreateRequest,
  ProgressEntryUpdateRequest,
  ProgressOverviewResponse,
} from '../../types/api';

export const progressAPI = {
  /**
   * Log a new progress entry
   */
  createProgress: (data: ProgressEntryCreateRequest) => {
    return api.post<ProgressEntryResponse>('/api/progress/', data);
  },

  /**
   * Update existing progress entry
   */
  updateProgress: (progressId: string, data: ProgressEntryUpdateRequest) => {
    return api.put<ProgressEntryResponse>(`/api/progress/${progressId}`, data);
  },

  /**
   * Get progress entries for a student
   */
  getProgressByStudent: (studentId: string) => {
    return api.get<ProgressEntryResponse[]>(`/api/progress/student/${studentId}`);
  },

  /**
   * Get progress overview (aggregated by subject)
   */
  getProgressOverview: (studentId: string) => {
    return api.get<ProgressOverviewResponse>(`/api/progress/student/${studentId}/overview`);
  },

  /**
   * Get specific progress entry
   */
  getProgressById: (progressId: string) => {
    return api.get<ProgressEntryResponse>(`/api/progress/${progressId}`);
  },
};

