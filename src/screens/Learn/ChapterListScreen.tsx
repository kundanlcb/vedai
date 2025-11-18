/**
 * Chapter List Screen
 * Displays chapters for a selected subject with progress indicators
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '../../constants';
import { Card } from '../../components';

interface Chapter {
  id: string;
  name: string;
  lessons: number;
  completed: number;
  progress: number;
  lastAccessed?: string;
}

export const ChapterListScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { subjectName } = route.params as { subjectId: string; subjectName: string };

  // Mock chapters data
  const chapters: Chapter[] = [
    {
      id: 'ch1',
      name: 'Introduction to Algebra',
      lessons: 8,
      completed: 5,
      progress: 62.5,
      lastAccessed: '2 days ago',
    },
    {
      id: 'ch2',
      name: 'Linear Equations',
      lessons: 10,
      completed: 7,
      progress: 70,
      lastAccessed: 'Yesterday',
    },
    {
      id: 'ch3',
      name: 'Quadratic Equations',
      lessons: 12,
      completed: 3,
      progress: 25,
      lastAccessed: '1 week ago',
    },
    {
      id: 'ch4',
      name: 'Systems of Equations',
      lessons: 9,
      completed: 0,
      progress: 0,
      lastAccessed: undefined,
    },
    {
      id: 'ch5',
      name: 'Polynomials',
      lessons: 11,
      completed: 8,
      progress: 72.7,
      lastAccessed: '3 days ago',
    },
  ];

  const handleChapterPress = (chapterId: string, chapterName: string) => {
    navigation.navigate('ContentViewer', { chapterId, chapterName, subjectName });
  };

  const renderChapterCard = ({ item }: { item: Chapter }) => (
    <TouchableOpacity
      onPress={() => handleChapterPress(item.id, item.name)}
      activeOpacity={0.7}
    >
      <Card variant="filled" style={styles.chapterCard}>
        <View style={styles.cardHeader}>
          <View style={styles.flex1}>
            <Text style={styles.chapterName}>{item.name}</Text>
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <MaterialIcons name="book" size={14} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{item.lessons} lessons</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="done" size={14} color={Colors.success} />
                <Text style={styles.metaText}>
                  {item.completed}/{item.lessons} done
                </Text>
              </View>
            </View>
          </View>
          <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.progress}%`, backgroundColor: Colors.primary },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(item.progress)}%</Text>
        </View>

        {/* Last Accessed */}
        {item.lastAccessed && (
          <Text style={styles.lastAccessed}>Last accessed: {item.lastAccessed}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={[styles.flex1, styles.mlMd]}>
          <Text style={styles.headerSubject}>{subjectName}</Text>
          <Text style={styles.headerSubtitle}>Chapters</Text>
        </View>
      </View>

      {/* Summary Card */}
      <View style={styles.summarySection}>
        <Card variant="filled" style={styles.summaryCard}>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Chapters</Text>
              <Text style={styles.summaryValue}>{chapters.length}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Completed</Text>
              <Text style={styles.summaryValue}>
                {chapters.filter(c => c.progress === 100).length}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Overall Progress</Text>
              <Text style={styles.summaryValue}>
                {Math.round(
                  chapters.reduce((sum, c) => sum + c.progress, 0) / chapters.length
                )}
                %
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Chapters List */}
      <FlatList
        data={chapters}
        renderItem={renderChapterCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  mlMd: { marginLeft: Spacing.md },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerSubject: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  summarySection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  summaryCard: {
    padding: Spacing.lg,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  summaryValue: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  chapterCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  chapterName: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  progressContainer: {
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  lastAccessed: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
  },
});
