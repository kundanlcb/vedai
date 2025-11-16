/**
 * Card Component
 * Container component for displaying grouped content
 */

import React from 'react';
import { View, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import { getColors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/typography';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({ children, style, testID }) => {
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginVertical: Spacing.md,
      borderColor: colors.border_light,
      borderWidth: 1,
    },
  });

  return (
    <View style={[styles.card, style]} testID={testID}>
      {children}
    </View>
  );
};

