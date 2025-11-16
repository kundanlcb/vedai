/**
 * Typography Theme - Font sizes, weights, and line heights
 */

// Platform-specific fonts for React Native
const fontFamily = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
};

export const Typography = {
  // Font Family
  fontFamily,

  // Font Sizes (in pixels)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },

  // Font Weights (for React Native)
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  } as const,

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Text Styles (predefined combinations)
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 1.2,
    fontFamily: fontFamily.bold,
  },

  h2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 1.2,
    fontFamily: fontFamily.bold,
  },

  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 1.25,
    fontFamily: fontFamily.semibold,
  },

  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.semibold,
  },

  h5: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.semibold,
  },

  h6: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.semibold,
  },

  body_lg: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.regular,
  },

  body_base: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.regular,
  },

  body_sm: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.regular,
  },

  body_xs: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.regular,
  },

  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.medium,
  },

  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.medium,
  },

  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 1.5,
    fontFamily: fontFamily.semibold,
  },
} as const;

// Spacing scale (for consistency)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

// Border Radius
export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

