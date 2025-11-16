/**
 * Card Component following Material Design
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors, Shadows, Spacing, BorderRadius } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  variant?: 'elevated' | 'filled' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  variant = 'filled',
}) => {
  const cardStyle = [
    styles.container,
    styles[`${variant}Card`],
    style,
  ];

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={cardStyle}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    overflow: 'hidden',
  },
  elevatedCard: {
    backgroundColor: Colors.surface,
    ...Shadows.medium,
  },
  filledCard: {
    backgroundColor: Colors.surfaceVariant,
  },
  outlinedCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
});

