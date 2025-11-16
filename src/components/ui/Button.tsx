/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { Colors, getColors } from '../../theme/colors';
import { Typography, Spacing, BorderRadius } from '../../theme/typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

const getVariantStyles = (variant: ButtonVariant, colorMode: string) => {
  const colors = getColors(colorMode as 'light' | 'dark');

  const variants = {
    primary: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
    },
    secondary: {
      backgroundColor: Colors.secondary,
      borderColor: Colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.border,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: Colors.error,
      borderColor: Colors.error,
    },
  };

  return variants[variant];
};

const getTextColor = (variant: ButtonVariant, colorMode: string) => {
  if (variant === 'outline' || variant === 'ghost') {
    const colors = getColors(colorMode as 'light' | 'dark');
    return colors.text_primary;
  }
  return '#FFFFFF';
};

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      minHeight: 32,
    },
    md: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      minHeight: 44,
    },
    lg: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.lg,
      minHeight: 52,
    },
  };

  return sizes[size];
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  labelStyle,
  testID,
}) => {
  const colorMode = useColorScheme() || 'light';
  const variantStyles = getVariantStyles(variant, colorMode);
  const sizeStyles = getSizeStyles(size);
  const textColor = getTextColor(variant, colorMode);

  const styles = StyleSheet.create({
    button: {
      ...variantStyles,
      ...sizeStyles,
      borderRadius: BorderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled || loading ? 0.6 : 1,
    },
    text: {
      color: textColor,
      fontSize: Typography.button.fontSize,
      fontWeight: Typography.button.fontWeight,
      lineHeight: Typography.button.lineHeight,
      marginLeft: icon ? Spacing.sm : 0,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
    >
      {icon && icon}
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

