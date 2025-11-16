/**
 * Color Theme - Light and Dark mode support
 */

export const Colors = {
  // Primary Colors
  primary: '#4F46E5', // Indigo
  primary_dark: '#4338CA',
  primary_light: '#6366F1',

  // Secondary Colors
  secondary: '#8B5CF6', // Violet
  secondary_dark: '#7C3AED',
  secondary_light: '#A78BFA',

  // Status Colors
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue

  // Neutral Colors - Light Mode
  light: {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text_primary: '#111827',
    text_secondary: '#6B7280',
    text_tertiary: '#9CA3AF',
    border: '#E5E7EB',
    border_light: '#F3F4F6',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Neutral Colors - Dark Mode
  dark: {
    background: '#111827',
    surface: '#1F2937',
    text_primary: '#F9FAFB',
    text_secondary: '#D1D5DB',
    text_tertiary: '#9CA3AF',
    border: '#374151',
    border_light: '#4B5563',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
};

export type ColorMode = 'light' | 'dark';

export const getColors = (colorMode: ColorMode) => ({
  primary: Colors.primary,
  secondary: Colors.secondary,
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.error,
  info: Colors.info,
  background: colorMode === 'light' ? Colors.light.background : Colors.dark.background,
  surface: colorMode === 'light' ? Colors.light.surface : Colors.dark.surface,
  text_primary: colorMode === 'light' ? Colors.light.text_primary : Colors.dark.text_primary,
  text_secondary: colorMode === 'light' ? Colors.light.text_secondary : Colors.dark.text_secondary,
  text_tertiary: colorMode === 'light' ? Colors.light.text_tertiary : Colors.dark.text_tertiary,
  border: colorMode === 'light' ? Colors.light.border : Colors.dark.border,
  border_light: colorMode === 'light' ? Colors.light.border_light : Colors.dark.border_light,
  overlay: colorMode === 'light' ? Colors.light.overlay : Colors.dark.overlay,
});

