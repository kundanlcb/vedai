/**
 * useProfile Hook
 * Custom hook for managing student profile state and API interactions
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { profileAPI } from '../api/endpoints/profile';
import { StudentProfileResponse, StudentProfileUpdateRequest } from '../types/api';

const PROFILE_QUERY_KEY = ['profile'];

/**
 * Fetch student profile by ID
 */
export const useGetProfile = (studentId: string | null | undefined) => {
  return useQuery<StudentProfileResponse, Error>({
    queryKey: [...PROFILE_QUERY_KEY, studentId],
    queryFn: async () => {
      if (!studentId) {
        throw new Error('Student ID is required');
      }
      const response = await profileAPI.getProfileById(studentId);
      if (!response.success) {
        throw new Error(response.error?.detail || 'Failed to fetch profile');
      }
      return response.data;
    },
    enabled: !!studentId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Update student profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user_id } = useAppSelector((state) => state.auth);

  return useMutation({
    mutationFn: async (data: StudentProfileUpdateRequest) => {
      if (!user_id) {
        throw new Error('User ID is required');
      }
      const response = await profileAPI.updateProfile(user_id, data);
      if (!response.success) {
        throw new Error(response.error?.detail || 'Failed to update profile');
      }
      return response.data;
    },
    onSuccess: (_data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY,
      });
    },
  });
};

/**
 * Create a new student profile
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await profileAPI.createProfile(data);
      if (!response.success) {
        throw new Error(response.error?.detail || 'Failed to create profile');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY,
      });
    },
  });
};

