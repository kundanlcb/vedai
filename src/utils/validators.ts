/**
 * Validators Utility
 * Form and data validation helpers
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

/**
 * Validate maximum length
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

/**
 * Validate numeric value
 */
export const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Validate URL format
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate phone number (basic)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Sanitize input (basic XSS prevention)
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .trim();
};

/**
 * Check if object has required properties
 */
export const hasRequiredProperties = (obj: any, requiredKeys: string[]): boolean => {
  return requiredKeys.every((key) => key in obj && obj[key] !== null && obj[key] !== undefined);
};

/**
 * Validate date format
 */
export const isValidDate = (date: any): boolean => {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  if (typeof date === 'string') {
    return !isNaN(Date.parse(date));
  }
  return false;
};

/**
 * Validate marks/score
 */
export const isValidScore = (obtained: number, total: number): boolean => {
  return (
    isNumeric(obtained) &&
    isNumeric(total) &&
    obtained >= 0 &&
    total >= 0 &&
    obtained <= total
  );
};

/**
 * Validate percentage (0-100)
 */
export const isValidPercentage = (value: number): boolean => {
  return isNumeric(value) && value >= 0 && value <= 100;
};

/**
 * Validate question type
 */
export const isValidQuestionType = (type: string): boolean => {
  return ['MCQ', 'SHORT_ANSWER', 'NUMERICAL'].includes(type);
};

/**
 * Validate difficulty level
 */
export const isValidDifficulty = (difficulty: string): boolean => {
  return ['EASY', 'MEDIUM', 'HARD'].includes(difficulty);
};

/**
 * Validate test attempt status
 */
export const isValidAttemptStatus = (status: string): boolean => {
  return ['IN_PROGRESS', 'COMPLETED', 'SUBMITTED'].includes(status);
};

