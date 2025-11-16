/**
 * Learn Module - Subject List Screen
 * Displays all available subjects with progress indicators
 */

import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { getColors } from '../../theme/colors';
import { Spacing } from '../../theme/typography';

export const LearnScreen = () => {
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: Spacing.lg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="h3" color="primary">
        Learn
      </Text>
      <Card>
        <Text variant="body_base" color="secondary">
          Subject list will be implemented in Phase 1
        </Text>
      </Card>
    </SafeAreaView>
  );
};

