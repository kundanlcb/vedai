/**
 * Mock Tests API Endpoints
 * Manages test attempts, results, and performance tracking
 */

import { api } from '../client';
import {
  MockTestResponse,
  MockTestListRequest,
  MockTestListResponse,
  MockTestStartRequest,
  MockTestStartResponse,
  MockTestSubmitRequest,
  MockTestSubmitResponse,
  MockTestAttemptResponse,
  MockTestAttemptsHistoryResponse,
  MockTestStatsResponse,
} from '../../types/api';

export const testsAPI = {
  /**
   * Get list of available tests
   */
  listTests: (params?: MockTestListRequest) => {
    return api.get<MockTestListResponse>('/api/tests/', { params });
  },

  /**
   * Get specific test details
   */
  getTest: (testId: string | number) => {
    return api.get<MockTestResponse>(`/api/tests/${testId}`);
  },

  /**
   * Get tests by subject and class
   */
  getTestsBySubjectClass: (subject: string, className: string) => {
    return api.get<MockTestListResponse>(`/api/tests/subject/${subject}/class/${className}`);
  },

  /**
   * Start a test attempt
   */
  startTest: (data: MockTestStartRequest) => {
    return api.post<MockTestStartResponse>(`/api/tests/${data.test_id}/start`, data);
  },

  /**
   * Get current attempt details
   */
  getAttempt: (attemptId: string) => {
    return api.get<MockTestAttemptResponse>(`/api/tests/attempts/${attemptId}`);
  },

  /**
   * Submit test attempt with answers
   */
  submitTest: (data: MockTestSubmitRequest) => {
    return api.post<MockTestSubmitResponse>(
      `/api/tests/attempts/${data.attempt_id}/submit`,
      data
    );
  },

  /**
   * Get attempt history for a student
   */
  getAttemptHistory: (studentId: string) => {
    return api.get<MockTestAttemptsHistoryResponse>(`/api/tests/student/${studentId}/attempts`);
  },

  /**
   * Get performance statistics for a student
   */
  getStudentStats: (studentId: string) => {
    return api.get<MockTestStatsResponse>(`/api/tests/student/${studentId}/stats`);
  },

  /**
   * Auto-save test answers (draft)
   */
  saveDraft: (attemptId: string, answers: Record<string, string | number>) => {
    return api.patch(`/api/tests/attempts/${attemptId}/draft`, { answers });
  },
};

