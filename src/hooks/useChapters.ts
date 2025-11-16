/**
 * useChapters Hook
 * Custom hook for managing chapters and content
 */

import { useQuery } from '@tanstack/react-query';
import { contentAPI } from '../api/endpoints/content';

const CHAPTERS_QUERY_KEY = ['chapters'];
const CONTENT_QUERY_KEY = ['content'];
const SUBJECTS_QUERY_KEY = ['subjects'];

/**
 * Fetch subjects for a given class
 */
export const useGetSubjects = (className: string) => {
  return useQuery({
    queryKey: [...SUBJECTS_QUERY_KEY, className],
    queryFn: () => contentAPI.getSubjects(className),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!className,
  });
};

/**
 * Fetch chapters for a subject
 */
export const useGetChapters = (subjectId: string | null | undefined) => {
  return useQuery({
    queryKey: [...CHAPTERS_QUERY_KEY, subjectId],
    queryFn: async () => {
      if (!subjectId) {
        throw new Error('Subject ID is required');
      }
      const result = await contentAPI.getChapters(subjectId);
      if (!result.success) {
        throw new Error('Failed to fetch chapters');
      }
      return result.data;
    },
    enabled: !!subjectId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Fetch content chunks for a chapter
 */
export const useGetContent = (
  chapterId: string | null | undefined,
  pageIndex: number = 0
) => {
  return useQuery({
    queryKey: [...CONTENT_QUERY_KEY, chapterId, pageIndex],
    queryFn: async () => {
      if (!chapterId) {
        throw new Error('Chapter ID is required');
      }
      const result = await contentAPI.getContent(chapterId, pageIndex);
      if (!result.success) {
        throw new Error('Failed to fetch content');
      }
      return result;
    },
    enabled: !!chapterId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

