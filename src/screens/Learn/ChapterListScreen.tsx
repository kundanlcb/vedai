/**
 * Learn Module - Chapter List Screen
 * Displays chapters for a selected subject
 */

import React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetChapters } from '../../hooks/useChapters';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { getColors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/typography';

type Props = any;

export const ChapterListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId, subjectName } = route.params as { subjectId: string; subjectName: string };
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);

  // Define styles BEFORE using them
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: Spacing.lg,
    },
    header: {
      marginBottom: Spacing.lg,
    },
    subjectName: {
      marginBottom: Spacing.sm,
    },
    subtitle: {
      marginBottom: Spacing.md,
    },
    chapterCard: {
      marginBottom: Spacing.md,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    chapterNumber: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#4F46E5',
      borderWidth: 2,
    },
    chapterInfo: {
      flex: 1,
    },
    status: {
      marginTop: Spacing.xs,
    },
    arrow: {
      marginLeft: Spacing.sm,
    },
  });

  const { data: chapters, isLoading, error } = useGetChapters(subjectId);

  const handleChapterPress = (chapterId: string, chapterName: string) => {
    navigation.navigate('ChapterList', { subjectId, subjectName, chapterId, chapterName });
  };

  const renderChapterCard = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => handleChapterPress(item.id, item.name)}>
      <Card style={styles.chapterCard}>
        <View style={styles.cardContent}>
          <View style={styles.chapterNumber}>
            <Text variant="button" color="primary" weight="bold">
              {index + 1}
            </Text>
          </View>
          <View style={styles.chapterInfo}>
            <Text variant="h5" color="primary" weight="semibold">
              {item.name}
            </Text>
            <Text variant="body_xs" color="secondary" style={styles.status}>
              Not started
            </Text>
          </View>
          <View style={styles.arrow}>
            <Text variant="h6" color="primary">
              →
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );


  if (isLoading) {
    return <Loading visible={true} message="Loading chapters..." />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text variant="h5" color="error">
            Failed to load chapters
          </Text>
          <Text variant="body_sm" color="secondary" style={{ marginTop: Spacing.md }}>
            {(error as Error).message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chapters}
        renderItem={renderChapterCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text variant="h5" color="secondary" style={styles.subjectName}>
              {subjectName}
            </Text>
            <Text variant="h4" color="primary" weight="semibold">
              Chapters
            </Text>
            <Text variant="body_sm" color="secondary" style={styles.subtitle}>
              Tap a chapter to start learning
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

