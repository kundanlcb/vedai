/**
 * Input Component
 * Text input field with label and error handling
 */

import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  useColorScheme,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { getColors } from '../../theme/colors';
import { Spacing, BorderRadius, Typography } from '../../theme/typography';

interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  placeholderTextColor,
  ...props
}) => {
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginVertical: Spacing.md,
    },
    label: {
      marginBottom: Spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: isFocused ? colors.primary : (error ? '#EF4444' : colors.border),
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      backgroundColor: colors.background,
      color: colors.text_primary,
      fontSize: Typography.body_base.fontSize,
      fontWeight: Typography.body_base.fontWeight,
      lineHeight: Typography.body_base.lineHeight,
    },
    errorText: {
      marginTop: Spacing.xs,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor || colors.text_tertiary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <Text variant="body_xs" color="error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

