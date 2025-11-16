/**
 * Loading Component
 * Full-screen loading overlay with spinner
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  Modal,
} from 'react-native';
import { Text } from './Text';
import { getColors, Colors } from '../../theme/colors';
import { Spacing } from '../../theme/typography';

interface LoadingProps {
  visible: boolean;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ visible, message = 'Loading...' }) => {
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.overlay,
    },
    content: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: Spacing.xl,
      alignItems: 'center',
      minWidth: 200,
    },
    message: {
      marginTop: Spacing.lg,
    },
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={Colors.primary} />
          {message && (
            <Text variant="body_sm" color="secondary" style={styles.message}>
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

