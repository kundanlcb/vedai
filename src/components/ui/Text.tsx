/**
 * Text Component
 * Semantic text component with predefined styles
 */

import React from 'react';
import { Text as RNText, useColorScheme, TextProps } from 'react-native';
import { getColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body_lg'
  | 'body_base'
  | 'body_sm'
  | 'body_xs'
  | 'caption'
  | 'label'
  | 'button';

type TextColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

const getColorValue = (color: TextColor, colorMode: string): string => {
  const colors = getColors(colorMode as 'light' | 'dark');

  const colorMap: Record<TextColor, string> = {
    primary: colors.text_primary,
    secondary: colors.text_secondary,
    tertiary: colors.text_tertiary,
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  };

  return colorMap[color];
};

export const Text: React.FC<CustomTextProps> = ({
  variant = 'body_base',
  color = 'primary',
  weight,
  style,
  ...props
}) => {
  const colorMode = useColorScheme() || 'light';
  const variantStyles = Typography[variant as keyof typeof Typography] as any;
  const textColor = getColorValue(color, colorMode);

  // Get fontWeight from either weight prop or variant
  const fontWeightValue = weight
    ? Typography.fontWeight[weight as keyof typeof Typography.fontWeight]
    : variantStyles.fontWeight;

  // Build final style - keep it simple and clean
  const finalStyle = [
    {
      fontSize: variantStyles.fontSize,
      lineHeight: variantStyles.lineHeight,
      color: textColor,
      fontWeight: fontWeightValue,
    },
    style,
  ];

  return <RNText style={finalStyle} {...props} />;
};

