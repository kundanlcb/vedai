/**
 * useQuestions Hook
 * Custom hook for managing question practice sessions
 */

import { useQuery } from '@tanstack/react-query';
import { questionsAPI } from '../api/endpoints/questions';

const QUESTIONS_QUERY_KEY = ['questions'];

/**
 * Fetch questions with optional filters
 */
export const useGetQuestions = (filters?: {
  subject?: string;
  chapter?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}) => {
  return useQuery({
    queryKey: [...QUESTIONS_QUERY_KEY, filters],
    queryFn: async () => {
      const result = await questionsAPI.getQuestions(filters);
      if (!result.success) {
        throw new Error('Failed to fetch questions');
      }
      return result.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Fetch single question detail
 */
export const useGetQuestion = (questionId: string | null | undefined) => {
  return useQuery({
    queryKey: [...QUESTIONS_QUERY_KEY, questionId],
    queryFn: async () => {
      if (!questionId) {
        throw new Error('Question ID is required');
      }
      const result = await questionsAPI.getQuestion(questionId);
      if (!result.success) {
        throw new Error('Failed to fetch question');
      }
      return result.data;
    },
    enabled: !!questionId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

