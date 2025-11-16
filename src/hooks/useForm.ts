/**
 * Custom hook for form state management
 */

import { useState, useCallback } from 'react';

export interface UseFormState {
  [key: string]: string | number | boolean;
}

export interface UseFormReturn<T extends UseFormState> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  setValue: (key: keyof T, value: T[keyof T]) => void;
  setError: (key: keyof T, error: string) => void;
  setFieldTouched: (key: keyof T) => void;
  resetForm: () => void;
  setSubmitting: (value: boolean) => void;
}

export const useForm = <T extends UseFormState>(
  initialValues: T,
  _onSubmit?: (values: T) => Promise<void>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[String(key)]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[String(key)];
        return newErrors;
      });
    }
  }, [errors]);

  const setError = useCallback((key: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [key]: error }));
  }, []);

  const setFieldTouched = useCallback((key: keyof T) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setError,
    setFieldTouched,
    resetForm,
    setSubmitting: setIsSubmitting,
  };
};

