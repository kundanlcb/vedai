/**
 * Questions API Endpoints
 * Manages question bank, filtering, and submission
 */

import { api } from '../client';

// Mock questions data
export const mockQuestions = [
  {
    id: 'q1',
    text: 'What is the SI unit of force?',
    type: 'mcq',
    subject: 'science-8',
    chapter: 'ch-1',
    difficulty: 'easy',
    marks: 1,
    options: [
      { id: 'opt1', text: 'Newton', is_correct: true },
      { id: 'opt2', text: 'Pascal' },
      { id: 'opt3', text: 'Joule' },
      { id: 'opt4', text: 'Watt' },
    ],
  },
  {
    id: 'q2',
    text: 'Define matter.',
    type: 'short',
    subject: 'science-8',
    chapter: 'ch-1',
    difficulty: 'medium',
    marks: 2,
    options: [],
  },
  {
    id: 'q3',
    text: 'Which of the following is a compound?',
    type: 'mcq',
    subject: 'science-8',
    chapter: 'ch-2',
    difficulty: 'easy',
    marks: 1,
    options: [
      { id: 'opt1', text: 'Oxygen' },
      { id: 'opt2', text: 'Water', is_correct: true },
      { id: 'opt3', text: 'Iron' },
      { id: 'opt4', text: 'Nitrogen' },
    ],
  },
  {
    id: 'q4',
    text: 'Solve: 2x + 5 = 13',
    type: 'short',
    subject: 'math-8',
    chapter: 'ch-2',
    difficulty: 'easy',
    marks: 2,
    options: [],
  },
  {
    id: 'q5',
    text: 'What are the three states of matter?',
    type: 'short',
    subject: 'science-8',
    chapter: 'ch-1',
    difficulty: 'medium',
    marks: 3,
    options: [],
  },
];

export const questionsAPI = {
  /**
   * Get all questions with optional filters
   */
  getQuestions: async (filters?: {
    subject?: string;
    chapter?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
  }) => {
    // Mock implementation - Replace with real API when ready
    let results = mockQuestions;

    if (filters?.subject) {
      results = results.filter((q) => q.subject === filters.subject);
    }
    if (filters?.chapter) {
      results = results.filter((q) => q.chapter === filters.chapter);
    }
    if (filters?.difficulty) {
      results = results.filter((q) => q.difficulty === filters.difficulty);
    }

    return {
      data: results,
      success: true,
      total: results.length,
    };
  },

  /**
   * Get single question detail
   */
  getQuestion: async (questionId: string) => {
    const question = mockQuestions.find((q) => q.id === questionId);
    return {
      data: question,
      success: !!question,
    };
  },

  /**
   * Submit answers and get results
   */
  submitAnswers: async (data: {
    student_id: string;
    question_ids: string[];
    answers: Record<string, string>;
  }) => {
    // Will be replaced with real API call
    return api.post('/questions/submit', data);
  },
};

