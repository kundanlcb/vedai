/**
 * Formatters Utility
 * Text and date formatting helpers
 */

import { formatDistance, format } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date relative to now (e.g., "2 hours ago")
 */
export const formatDistanceToNow = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting distance:', error);
    return '';
  }
};

/**
 * Format time duration in seconds to readable format
 * @param seconds Total seconds
 * @returns Formatted string (e.g., "1h 30m" or "45m")
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 && hours === 0 && minutes === 0) parts.push(`${secs}s`);

  return parts.join(' ') || '0s';
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format score display
 */
export const formatScore = (obtained: number, total: number): string => {
  return `${obtained}/${total}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format time for display (HH:MM:SS)
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hours, minutes, secs].map((v) => String(v).padStart(2, '0')).join(':');
};

/**
 * Parse ISO date string
 */
export const parseISO = (dateString: string): Date | null => {
  try {
    return new Date(dateString);
  } catch (error) {
    console.error('Error parsing ISO date:', error);
    return null;
  }
};

/**
 * Format accuracy percentage with color
 */
export const getAccuracyColor = (accuracy: number): string => {
  if (accuracy >= 0.8) return '#10B981'; // Green - Excellent
  if (accuracy >= 0.6) return '#F59E0B'; // Amber - Good
  return '#EF4444'; // Red - Needs improvement
};

/**
 * Get difficulty badge color
 */
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty?.toUpperCase()) {
    case 'EASY':
      return '#10B981';
    case 'MEDIUM':
      return '#F59E0B';
    case 'HARD':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

/**
 * Format marks/score
 */
export const formatMarks = (marks: number): string => {
  return `${marks} mark${marks !== 1 ? 's' : ''}`;
};

