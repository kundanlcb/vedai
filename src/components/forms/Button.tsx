/**
 * Material Design Button Component
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, FontSizes, Spacing } from '../../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.container,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    isDisabled && styles.disabledContainer,
    style,
  ];

  const textStyleComputed = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.white : Colors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialIcons
              name={icon}
              size={20}
              color={getIconColor(variant, isDisabled)}
              style={styles.iconLeft}
            />
          )}
          <Text style={textStyleComputed}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <MaterialIcons
              name={icon}
              size={20}
              color={getIconColor(variant, isDisabled)}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const getIconColor = (variant: ButtonVariant, isDisabled: boolean): string => {
  if (isDisabled) return Colors.gray400;
  switch (variant) {
    case 'primary':
      return Colors.white;
    case 'secondary':
      return Colors.white;
    case 'outlined':
    case 'text':
      return Colors.primary;
    default:
      return Colors.primary;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },

  // Variants
  primaryContainer: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
  },
  secondaryContainer: {
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.3,
  },
  outlinedContainer: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOpacity: 0.08,
  },
  textContainer: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },

  // Sizes
  smallContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 40,
  },
  mediumContainer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  largeContainer: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 52,
  },

  // Disabled state
  disabledContainer: {
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.gray400,
  },

  // Text styles
  text: {
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: Colors.white,
    fontSize: FontSizes.labelLarge,
  },
  secondaryText: {
    color: Colors.white,
    fontSize: FontSizes.labelLarge,
  },
  outlinedText: {
    color: Colors.primary,
    fontSize: FontSizes.labelLarge,
  },
  textText: {
    color: Colors.primary,
    fontSize: FontSizes.labelLarge,
  },

  // Size-specific text
  smallText: {
    fontSize: FontSizes.bodySmall,
  },
  mediumText: {
    fontSize: FontSizes.bodyMedium,
  },
  largeText: {
    fontSize: FontSizes.bodyLarge,
  },

  // Icon styles
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

