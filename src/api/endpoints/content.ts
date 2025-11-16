/**
 * Content API Endpoints
 * Manages subjects, chapters, and content chunks
 */

import { api } from '../client';

// Mock data for Phase 1 - Replace with real backend when ready
export const mockSubjects = {
  'class-8': [
    { id: 'science-8', name: 'Science', class_name: 'Class 8', description: 'Physics, Chemistry, Biology' },
    { id: 'math-8', name: 'Mathematics', class_name: 'Class 8', description: 'Algebra, Geometry, Statistics' },
    { id: 'english-8', name: 'English', class_name: 'Class 8', description: 'Literature, Grammar, Writing' },
    { id: 'sst-8', name: 'Social Studies', class_name: 'Class 8', description: 'History, Geography, Civics' },
  ],
  'class-9': [
    { id: 'science-9', name: 'Science', class_name: 'Class 9', description: 'Physics, Chemistry, Biology' },
    { id: 'math-9', name: 'Mathematics', class_name: 'Class 9', description: 'Algebra, Geometry, Trigonometry' },
    { id: 'english-9', name: 'English', class_name: 'Class 9', description: 'Literature, Grammar, Writing' },
    { id: 'sst-9', name: 'Social Studies', class_name: 'Class 9', description: 'History, Geography, Civics' },
  ],
  'class-10': [
    { id: 'science-10', name: 'Science', class_name: 'Class 10', description: 'Physics, Chemistry, Biology' },
    { id: 'math-10', name: 'Mathematics', class_name: 'Class 10', description: 'Algebra, Geometry, Trigonometry' },
    { id: 'english-10', name: 'English', class_name: 'Class 10', description: 'Literature, Grammar, Writing' },
    { id: 'sst-10', name: 'Social Studies', class_name: 'Class 10', description: 'History, Geography, Civics' },
  ],
};

export const mockChapters: Record<string, any[]> = {
  'science-8': [
    { id: 'ch-1', name: 'Matter Around Us', subject: 'science-8', order: 1 },
    { id: 'ch-2', name: 'Is Matter Around Us Pure?', subject: 'science-8', order: 2 },
    { id: 'ch-3', name: 'Atoms and Molecules', subject: 'science-8', order: 3 },
  ],
  'math-8': [
    { id: 'ch-1', name: 'Rational Numbers', subject: 'math-8', order: 1 },
    { id: 'ch-2', name: 'Linear Equations in One Variable', subject: 'math-8', order: 2 },
    { id: 'ch-3', name: 'Understanding Quadrilaterals', subject: 'math-8', order: 3 },
  ],
};

export const mockContentChunks: Record<string, any[]> = {
  'ch-1': [
    { id: 'chunk-1', index: 0, text: 'Matter is anything that has mass and occupies space...', metadata: {} },
    { id: 'chunk-2', index: 1, text: 'All matter is made up of very tiny particles called atoms or molecules...', metadata: {} },
    { id: 'chunk-3', index: 2, text: 'Physical properties of matter include color, shape, size, and texture...', metadata: {} },
  ],
  'ch-2': [
    { id: 'chunk-1', index: 0, text: 'A pure substance has a fixed composition and constant properties...', metadata: {} },
    { id: 'chunk-2', index: 1, text: 'Mixtures are combinations of two or more pure substances...', metadata: {} },
  ],
};

export const contentAPI = {
  /**
   * Get all subjects for a given class
   */
  getSubjects: async (className: string) => {
    // Mock implementation - Replace with real API call
    const classKey = `class-${className.split(' ')[1].toLowerCase()}`;
    return {
      data: mockSubjects[classKey as keyof typeof mockSubjects] || [],
      success: true,
    };
  },

  /**
   * Get chapters for a subject
   */
  getChapters: async (subjectId: string) => {
    // Mock implementation - Replace with real API call
    return {
      data: mockChapters[subjectId as keyof typeof mockChapters] || [],
      success: true,
    };
  },

  /**
   * Get content chunks for a chapter with pagination
   */
  getContent: async (chapterId: string, pageIndex: number = 0, pageSize: number = 1) => {
    // Mock implementation - Replace with real API call
    const chunks = mockContentChunks[chapterId as keyof typeof mockContentChunks] || [];
    return {
      data: chunks.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
      success: true,
      total: chunks.length,
      currentPage: pageIndex,
      pageSize,
    };
  },

  /**
   * Log progress for a chapter
   */
  logProgress: async (data: {
    student_id: string;
    subject: string;
    chapter: string;
    completion_percentage: number;
    time_spent_minutes: number;
  }) => {
    // Will be replaced with real API call
    return api.post('/api/progress/', data);
  },

  /**
   * Get progress for a student
   */
  getProgress: async (studentId: string) => {
    return api.get(`/api/progress/student/${studentId}`);
  },

  /**
   * Get progress overview
   */
  getProgressOverview: async (studentId: string) => {
    return api.get(`/api/progress/student/${studentId}/overview`);
  },
};

